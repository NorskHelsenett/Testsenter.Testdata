using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using log4net;
using Newtonsoft.Json;
using Shared.Common.DI;
using Shared.Common.Storage;
using Shared.Common.Storage.Queue;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Surveillance.PeriodicJob
{
    public class HandleOneSurveillanceItem : IHandleMessageOnQueue
    {
        public bool PostResults { get; set; }
        private readonly IDependencyInjector _di;
        public HandleOneSurveillanceItem(IDependencyInjector di)
        {
            _di = di;
            PostResults = true;
        }

        public void Do(QueueItem msg, ILog logger)
        {
            DoAsync(msg, logger).GetAwaiter().GetResult();
        }

        public async Task<bool> DoAsync(QueueItem msg, ILog logger, CancellationToken cancellationToken)
        {
            return await DoAsync(msg, logger);
        }

        public async Task<bool> DoAsync(QueueItem msg, ILog logger)
        {
            var simpleQMsg = JsonConvert.DeserializeObject<Tuple<string,string>>(msg.GetContentAsJson());
            string partitionKey, rowKey;
            SurveilledItem.ParsePartitionkeyAndRowkey(simpleQMsg, out partitionKey, out rowKey);

            var suveillanceItem = await _di.GetInstance<ITableStorageDb<SurveilledItem>>().GetAsync(partitionKey, rowKey);
            if (suveillanceItem == null)
            {
                logger.Error($"Tried to find surveillanceitem with partitionkey={partitionKey} and rowkey={rowKey}, but couldnt find it");
                return true;
            }
            var surveillanceAction = TryGetSurveillanceAction(suveillanceItem, logger);
            if (surveillanceAction == null)
                return true;

            Impersonate(suveillanceItem.RegisteredByUsername, logger);

            var surveillanceResult = await surveillanceAction.Check(suveillanceItem, _di);
            if (surveillanceResult == null)
                return true;

            //fixing commonidentifier on old objects. can remove this code in the future 
            if (string.IsNullOrEmpty(suveillanceItem.CommonIdentifier) && !string.IsNullOrEmpty(surveillanceResult.CommonIdentifier))
            {
                try
                {
                    suveillanceItem.CommonIdentifier = surveillanceResult.CommonIdentifier;
                    await _di.GetInstance<ITableStorageDb<SurveilledItem>>().InsertAsync(suveillanceItem, true, true);
                }
                catch (Exception e)
                {
                    logger.Warn("Fail when linking surveillance to suveillanceItem. suveillanceItem: " + JsonConvert.SerializeObject(surveillanceResult), e);
                }
            }

            var msgResult = surveillanceResult.Success
                ? "Surveillanceresult was successfull. Found no deviation"
                : "Surveillanceresult failed. Text: " + surveillanceResult.ErrorText + Environment.NewLine + "Compared object: " + suveillanceItem.ContentAsJson + " with " + surveillanceResult.ContentAsJson;

            logger.Info(msgResult);

            var latestResult = new LatestSurveillanceResult()
            {
                ActionKey = surveillanceResult.ActionKey,
                ActionInstanceIdentifier = surveillanceResult.ActionInstanceIdentifier,
                Id = surveillanceResult.Id,
                ContentAsJson = surveillanceResult.ContentAsJson,
                TeamProjectInt = surveillanceResult.TeamProjectInt,
                CheckedAt = surveillanceResult.CheckedAt,
                ErrorText = surveillanceResult.ErrorText,
                RegisterEnvironmentInt = surveillanceResult.RegisterEnvironmentInt,
                RegisteredBy = surveillanceResult.RegisteredBy,
                Success = surveillanceResult.Success
            };

            if (PostResults)
            {
                await _di.GetInstance<IJsonStorage<SurveillanceResult>>().Post(surveillanceResult);
                return await _di.GetInstance<IJsonStorage<LatestSurveillanceResult>>().Put(latestResult);
            }

            return true;
        }

        private void Impersonate(string suveillanceItemRegisteredByUsername, ILog logger)
        {
            var ci = _di.GetInstance<IUserManager>().GetClaimsIdentity(suveillanceItemRegisteredByUsername);

            if (ci == null)
            {
                var msg = "Cannot impersonate user with username " + suveillanceItemRegisteredByUsername;
                logger.Error(msg);
                throw new ArgumentException(msg);
            }

            var claimsPrincipal = new ClaimsPrincipal(ci);
            Thread.CurrentPrincipal = claimsPrincipal;
        }

        private ISurveillanceAction TryGetSurveillanceAction(SurveilledItem s, ILog logger)
        {
            try
            {
                return _di.GetInstance<ISurveillanceAction>(s.ActionKey);
            }
            catch (Exception e)
            {
                logger.Error("Fail to resolve ISurveillanceAction for item with actionKey " + s.ActionKey, e);
                return null;
            }
        }

        public string GetName()
        {
            return "handleone";
        }

        
    }
}