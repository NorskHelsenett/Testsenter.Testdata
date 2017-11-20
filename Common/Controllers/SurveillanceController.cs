using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using Shared.Common.Azure.Scheduler;
using Shared.Common.DI;
using Shared.Common.Logic;
using Shared.Common.Storage;
using Shared.Common.Storage.Queue;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;
using TestdataApp.Common.Surveillance;
using TestdataApp.Common.Surveillance.PeriodicJob;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public abstract class SurveillanceController<TPersonIndexEntity> : BaseApiController, ISurveillanceController
        where TPersonIndexEntity : class, IIndexEntity
    {
        private readonly IAzureSearch<TPersonIndexEntity> _personIndex;
        private readonly IJsonStorage<BuildIndexComplete> _buildIndexStorage;

        protected SurveillanceController(IDependencyInjector di, IAzureSearch<TPersonIndexEntity> personIndex, IJsonStorage<BuildIndexComplete> buildIndexStorage) : base(di)
        {
            _personIndex = personIndex;
            _buildIndexStorage = buildIndexStorage;
        }

        [HttpGet]
        [Route("api/Surveillance/All")]
        public virtual async Task<IEnumerable<LatestSurveillanceResult>> GetLatestResults()
        {
            var latestResults = (await LatestSurveillanceResult.GetLatestSurveillanceResult(GetTeam(), Di.GetInstance<IJsonStorage<LatestSurveillanceResult>>())).ToList();
            var claimDb = Di.GetInstance<ITableStorageDb<SurveilledItem>>();

            foreach (var possibleSurveillanceAction in Di.GetAllInstancesOf<ISurveillanceAction>())
            {
                foreach (var surveilanceItem in await SurveilledItem.GetAllForteam(possibleSurveillanceAction.GetKey(), GetTeam(), claimDb))
                {
                    var existing = latestResults.FirstOrDefault(result => result.ActionInstanceIdentifier == surveilanceItem.ActionInstanceIdentifier && result.ActionKey == surveilanceItem.ActionKey);

                    if (existing != null)
                    {
                        if (string.IsNullOrEmpty(existing.CommonIdentifier))
                            existing.CommonIdentifier = surveilanceItem.CommonIdentifier;

                        existing.Taken = true;
                        continue;
                    }

                    var lsr = new LatestSurveillanceResult
                    {
                        ActionKey = surveilanceItem.ActionKey,
                        ActionInstanceIdentifier = surveilanceItem.ActionInstanceIdentifier,
                        CommonIdentifier = surveilanceItem.CommonIdentifier ?? surveilanceItem.ActionInstanceIdentifier,
                        RegisterEnvironmentInt = surveilanceItem.RegisterEnvironmentInt,
                        RegisteredBy = surveilanceItem.RegisteredByFriendlyName,
                        TeamProjectInt = surveilanceItem.TeamProjectInt,
                        Success = true,
                        Taken = true
                    };

                    latestResults.Add(lsr);
                }
            }

            return latestResults.Where(x => x.Taken);
        }

        [HttpGet]
        [Route("api/Surveillance/Next")]
        public virtual DateTime? NextCheck()
        {
            var val = Di.GetInstance<IScheduledAutoTestApi>()
                    .Get(GetConstantsProvider().TriggerAllSurveillancesSchedulerName())
                    .NextRun;

            return val;
        }

        [HttpGet]
        [Route("api/Surveillance/Previous")]
        public virtual DateTime? PreviousCheck()
        {
            var val = Di.GetInstance<IScheduledAutoTestApi>()
                    .Get(GetConstantsProvider().TriggerAllSurveillancesSchedulerName())
                    .LastRun;

            return val;
        }

        [HttpGet]
        [Route("api/Surveillance/synchronized/")]
        public virtual async Task<IEnumerable<Tuple<string, DateTime>>> GetSynctimes()
        {
            var result = new List<Tuple<string, DateTime>>();
            foreach (var register in GetConstantsProvider().AllRegisternamesForBuildingIndexes())
            {
                var allSyncs = (await _buildIndexStorage.Get(register)).ToList();
                var sorted = allSyncs.Where(y => y.When != null).OrderByDescending(x => x.When).FirstOrDefault();

                var latestSync = sorted ?? allSyncs.FirstOrDefault();
                if(latestSync == null)
                    continue;

                var date = latestSync.When?.ToNorwegianTime() ?? DateTime.UtcNow.AddDays(-1).ToNorwegianTime();

                result.Add(new Tuple<string, DateTime>(register.ToDescription(), date));
            }

            return result;
        }

        [Authorize(Roles = "Admin")]
        [Route("api/Surveillance/PeriodicJob/Run")]
        public virtual async Task<bool> Run()
        {
            await
                Di.GetInstance<IQueue>()
                    .SendAsync(new SimpleQueueItem(QueueItemType.HodorTriggerAllSurveillance, string.Empty));

            return true;
        }

        [HttpPost]
        [Route("api/Surveillance/{commonidentifier}/{actionKey}/{actionInstanceId}/{registerEnvironment}")]
        public virtual async Task<bool> On(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentException("Content was null");

            var surveillanceAction = Di.GetInstance<ISurveillanceAction>(actionKey);
            if(!surveillanceAction.ValidJson(content))
                throw new ArgumentException("Content was not in the right format given actionkey: " + actionKey);

            var claimDb = Di.GetInstance<ITableStorageDb<SurveilledItem>>();
            await claimDb.InsertAsync(new SurveilledItem(actionKey, actionInstanceId, GetTeam())
            {
                RegisteredByFriendlyName = GetFriendlyName(),
                RegisteredByUsername = GetEmail(),
                ClaimedWhen = DateTime.Now,
                ContentAsJson = content,
                RegisterEnvironmentInt = registerEnvironment,
                CommonIdentifier = commonidentifier
            }, true, true);

            var team = GetTeam().Id;
            await _personIndex.AddToPropertyList(commonidentifier, "Teams", team.ToString());

            return true;
        }

        [HttpDelete]
        [Route("api/Surveillance/{commonidentifier}/{actionKey}/{actionInstanceId}/{registerEnvironment}")]
        public virtual async Task<bool> Off(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment)
        {
            var claimDb = Di.GetInstance<ITableStorageDb<SurveilledItem>>();

            var element = await SurveilledItem.Get(actionKey, actionInstanceId, GetTeam(), claimDb);
            if (element == null)
                return false;

            claimDb.DeleteMany(new [] { element });

            var latestResultDb = Di.GetInstance<IJsonStorage<LatestSurveillanceResult>>();
            var latestResult = await LatestSurveillanceResult.GetLatestSurveillanceResult(actionKey, actionInstanceId, GetTeam(), latestResultDb);
            if (latestResult != null)
                await latestResultDb.Delete(latestResult);

            var team = GetTeam().Id;
            var anyOtherSurveillanceItems = TriggerAllSurveillanceItems<RegisterPersonModel>.GetAllSurveillanceItems(Di)
                .Any(item => !string.IsNullOrEmpty(item.CommonIdentifier) && item.CommonIdentifier == commonidentifier && item.TeamProjectInt == team);

            if(!anyOtherSurveillanceItems)
                await _personIndex.RemoveFromPropertyList(commonidentifier, "Teams", team.ToString());

            return true;
        }

        [HttpPut]
        [Route("api/Surveillance/{commonidentifier}/{actionKey}/{actionInstanceId}/{registerEnvironment}")]
        public virtual async Task<bool> AcceptChanges(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content)
        {
            if (string.IsNullOrEmpty(content))
                throw new ArgumentException("Content was null");

            var surveillanceAction = Di.GetInstance<ISurveillanceAction>(actionKey);
            if (!surveillanceAction.ValidJson(content))
                throw new ArgumentException("Content was not in the right format given actionkey: " + actionKey);

            var latestResultDb = Di.GetInstance<IJsonStorage<LatestSurveillanceResult>>();
            var latestResult = await LatestSurveillanceResult.GetLatestSurveillanceResult(actionKey, actionInstanceId,
                GetTeam(), latestResultDb);
            if (latestResult != null)
                await latestResultDb.Delete(latestResult);

            var claimDb = Di.GetInstance<ITableStorageDb<SurveilledItem>>();

            var surveillance = await SurveilledItem.Get(actionKey, actionInstanceId, GetTeam(), claimDb);
            surveillance.ContentAsJson = content;
            surveillance.ClaimedWhen = DateTime.Now;

            await claimDb.InsertAsync(surveillance, true, true);
            return true;
        }
    }
}