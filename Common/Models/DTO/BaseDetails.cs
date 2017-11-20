using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Common.DI;
using Shared.Common.Storage;
using Shared.Common.Storage.Mock;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DTO
{
    public class BaseDetails : IDetails
    {
        public bool CommentsEnabled { get; set; }
        public bool SurveillanceEnabled { get; set; }

        public BaseDetails(bool commentsEnabled, bool surveillanceEnabled)
        {
            CommentsEnabled = commentsEnabled;
            SurveillanceEnabled = surveillanceEnabled;
        }

        public IEnumerable<Comment> Comments { get; set; }
        public List<Surveillance> Surveillances { get; set; }

        public void SetComments(IEnumerable<Comment> comments)
        {
            Comments = comments;
        }

        public async Task<bool> SetSurveillanceInfo(IDependencyInjector di, List<Hit> hits, Team teamForLoggedInUser)
        {
            if (!SurveillanceEnabled)
                return false;

            var resultForMyTeam = await GetLatestResultForMyTeam(teamForLoggedInUser, di);

            Surveillances = new List<Surveillance>();

            foreach (var hit in hits)
            {
                var surveillances = (await Surveillance.GetPossibleSurveillances(teamForLoggedInUser, hit, di, resultForMyTeam)).ToList();
                if (!surveillances.Any())
                    continue;

                Surveillances.AddRange(surveillances);
            }

            return true;
        }

        

        private static async Task<IJsonStorage<LatestSurveillanceResult>> GetLatestResultForMyTeam(Team project, IDependencyInjector di)
        {
            var mockedDb = new JsonStorageDictionaryDb<LatestSurveillanceResult>();

            (await LatestSurveillanceResult.GetLatestSurveillanceResult(project, di.GetInstance<IJsonStorage<LatestSurveillanceResult>>()))
                .ToList()
                .ForEach(element => mockedDb.Post(element));

            return mockedDb;
        }
    }
}