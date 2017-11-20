using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using log4net;
using Shared.Common.DI;
using Shared.Common.Logic;
using Shared.Common.Storage;
using Shared.Common.Storage.Queue;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Surveillance.PeriodicJob
{
    public class TriggerAllSurveillanceItems<TModel> : IHandleMessageOnQueue
        where TModel : class, IIndexEntity, IJsonStorageEntity, new()
    {
        private readonly IJsonStorage<TModel> _backupDb;
        private readonly IAzureSearch<TModel> _index;
        private readonly ITableStorageDb<SurveilledItem> _suvItemDb;
        private readonly IEnumerable<ISurveillanceAction> _allRegisteredSurvAction;
        private readonly IQueue _queueToPutSingleSurveillances;
        private const string HandlerName = "triggerallsurveillanceitems";

        public TriggerAllSurveillanceItems(IJsonStorage<TModel> backupDb, IAzureSearch<TModel> index, ITableStorageDb<SurveilledItem> suvItemDb, IEnumerable<ISurveillanceAction> allRegisteredSurvAction, IQueue queueToPutSingleSurveillances)
        {
            _backupDb = backupDb;
            _index = index;
            _suvItemDb = suvItemDb;
            _allRegisteredSurvAction = allRegisteredSurvAction;
            _queueToPutSingleSurveillances = queueToPutSingleSurveillances;
        }

        public void Do(QueueItem msg, ILog logger)
        {
            QueueAllSurveillanceItems().GetAwaiter().GetResult();
        }

        public async Task<bool> DoAsync(QueueItem msg, ILog logger, CancellationToken cancellationToken)
        {
            return await DoAsync(msg, logger);
        }

        public async Task<bool> DoAsync(QueueItem msg, ILog logger)
        {
            return await DoAsync(msg, logger, true);
        }

        public async Task<bool> DoAsync(QueueItem msg, ILog logger, bool doSyncJobs)
        {
            var result = await QueueAllSurveillanceItems();

            if (doSyncJobs)
            {
                await BackupPersonsWithTags();
                await SyncPersonsWithTeams(logger);
            }

            return result;
        }

        public async Task<int> SyncPersonsWithTeams(ILog logger, bool pushEvenIfNotPersonExistsOnIndex = false)
        {
            var allSurveillanceItems = GetAllSurveillanceItems()
                .Where(person => !string.IsNullOrEmpty(person.CommonIdentifier))
                .ToList();

            var allWithTeams = (await _index.GetCompleteSet("", "teams/any()")).Where(x => x.Teams != null & x.Teams.Any()).ToDictionary(x => x.CommonIdentifier, y => y);

            var missingOnIndex = allSurveillanceItems
                .Where(x => !string.IsNullOrEmpty(x.CommonIdentifier) && !allWithTeams.ContainsKey(x.CommonIdentifier))
                .ToList();

            var pushThisBatch = new Dictionary<string, TModel>();
            foreach (var missedItem in missingOnIndex)
            {
                var itemOnIndex = await _index.GetByKey(missedItem.CommonIdentifier, false);
                if (itemOnIndex != null)
                {
                    await _index.AddToPropertyList(missedItem.CommonIdentifier, "Teams", missedItem.TeamProjectInt.ToString());
                }
                else
                {
                    if (pushEvenIfNotPersonExistsOnIndex)
                    {
                        if(pushThisBatch.ContainsKey(missedItem.CommonIdentifier))
                            pushThisBatch[missedItem.CommonIdentifier].Teams.Add(missedItem.TeamProjectInt.ToString());
                        else
                            pushThisBatch.Add(missedItem.CommonIdentifier, new TModel
                            {
                                CommonIdentifier = missedItem.CommonIdentifier,
                                Teams = new string[] { missedItem.TeamProjectInt.ToString() }
                            });
                    }
                    else
                        logger.Warn($"Item with commonidentifier {missedItem.CommonIdentifier} was missing on index, but couldnt find this entry on the index. Continuing");   
                }
            }

            if (pushThisBatch.Any())
                await _index.MergeOrUploadBatch(pushThisBatch.Values.ToArray());

            return missingOnIndex.Count;
        }

        public async Task<int> BackupPersonsWithTags()
        {
            var all = ((await _index.GetCompleteSet("", "tags/any()")).Where(x => x.Tags != null & x.Tags.Any())).ToList();

            if (all.Any())
            {
                await _backupDb.Put(all);
            }

            var deleteThese = new List<TModel>();

            foreach (var existingInDb in await _backupDb.Get(IndexEntity.All))
            {
                if (all.All(person => person.CommonIdentifier != existingInDb.CommonIdentifier))
                    deleteThese.Add(existingInDb);
            }

            if(deleteThese.Any())
                await _backupDb.Delete(deleteThese);

            return all.Count;
        }

        private async Task<bool> QueueAllSurveillanceItems()
        {
            foreach (var surveillanceItem in GetAllSurveillanceItems())
            {
                await InsertIntoWorkQ(_queueToPutSingleSurveillances, surveillanceItem);
            }
            
            return true;
        }
        
        public static List<SurveilledItem> GetAllSurveillanceItems(IDependencyInjector di)
        {
            return GetAllSurveillanceItems(di.GetInstance<ITableStorageDb<SurveilledItem>>(), di.GetAllInstancesOf<ISurveillanceAction>());
        }

        private List<SurveilledItem> GetAllSurveillanceItems()
        {
            return GetAllSurveillanceItems(_suvItemDb, _allRegisteredSurvAction);
        }

        private static List<SurveilledItem> GetAllSurveillanceItems(ITableStorageDb<SurveilledItem> suvItemDb, IEnumerable<ISurveillanceAction> allRegisteredSurvAction)
        {
            var result = new List<SurveilledItem>();
            foreach (var registeredSurvAction in allRegisteredSurvAction)
            {
                var actionKey = registeredSurvAction.GetKey();
                foreach (var surveillanceItem in suvItemDb.Get(actionKey))
                {
                    result.Add(surveillanceItem);
                }
            }

            return result;
        }

        public static async Task<bool> InsertIntoWorkQ(IQueue q, SurveilledItem surveillanceItem)
        {
            return await
                q.SendAsync(new SimpleQueueItem(QueueItemType.HodorTriggerOneSurveillanceItem, surveillanceItem.Id())
                {
                    Content = surveillanceItem.GetPartionkeyAndRowkey()
                });
        }

        public string GetName()
        {
            return HandlerName;
        }
    }
}