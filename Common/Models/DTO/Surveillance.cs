using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Common.DI;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;
using TestdataApp.Common.Surveillance;

namespace TestdataApp.Common.Models.DTO
{
    public class Surveillance
    {
        private const string RouteFormat = "api/Surveillance/{0}/{1}/{2}/{3}";

        public string ActionFriendlyName { get; set; }
        public string ActionKey { get; set; }
        public SurveillanceResult LatestSurveillanceResultForMyTeam { get; set; }

        public bool IsChecked { get; set; }

        public string OriginalContentAsJson { get; set; }

        public string UrlToToggle { get; set; }

        public static string GetRoute(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment)
        {
            return string.Format(RouteFormat, commonidentifier, actionKey, actionInstanceId, registerEnvironment);
        }

        public List<SurveilledItem> TeamsThatSurveillThisInstance { get; set; }

        public static async Task<IEnumerable<Surveillance>> GetPossibleSurveillances(Team teamForLoggedInUser, Hit hit, IDependencyInjector di, IJsonStorage<LatestSurveillanceResult> surveilResultDb)
        {
            var surveilDb = di.GetInstance<ITableStorageDb<SurveilledItem>>();

            var result = new List<Surveillance>();
            var surveillanceActions = di.GetAllInstancesOf<ISurveillanceAction>();
            foreach(var isurveillance in surveillanceActions.Where(s => s.ApplicableForHit(hit)))
            {
                var s = await GetSurveillance(hit, isurveillance, teamForLoggedInUser, surveilDb, surveilResultDb);
                result.Add(s);
            }

            return result;
        }

        private static async Task<Surveillance> GetSurveillance(Hit hit, ISurveillanceAction isurveillance, Team teamForLoggedInUser, ITableStorageDb<SurveilledItem> surveiItemDb, IJsonStorage<LatestSurveillanceResult> surveilResultDb)
        {
            var s = new Surveillance
            {
                ActionFriendlyName = isurveillance.GetFriendlyName(),
                ActionKey = isurveillance.GetKey(),
                UrlToToggle = GetRoute(hit.CommonIdentifier, isurveillance.GetKey(), hit.GetActionInstanceIdentifier(), hit.RegisterEnvironmentInt)
            };

            s.TeamsThatSurveillThisInstance = (await SurveilledItem.GetAllForActionIdentifier(isurveillance.GetKey(), hit.GetActionInstanceIdentifier(), surveiItemDb)).ToList();

            if (s.TeamsThatSurveillThisInstance.Any(team => team.TeamProjectInt == teamForLoggedInUser.Id))
            {
                s.OriginalContentAsJson = s.TeamsThatSurveillThisInstance.First(team => team.TeamProjectInt == teamForLoggedInUser.Id).ContentAsJson;
                s.LatestSurveillanceResultForMyTeam = await LatestSurveillanceResult.GetLatestSurveillanceResult(s.ActionKey, hit.GetActionInstanceIdentifier(), teamForLoggedInUser, surveilResultDb);
                s.IsChecked = true;
            }
            else
                s.IsChecked = false;

            return s;
        }
    }
}