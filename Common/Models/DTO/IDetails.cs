using System.Collections.Generic;
using System.Threading.Tasks;
using Shared.Common.DI;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DTO
{
    public interface IDetails
    {
        void SetComments(IEnumerable<Comment> comments);
        Task<bool> SetSurveillanceInfo(IDependencyInjector di, List<Hit> hits, Team teamForLoggedInUser);
        bool CommentsEnabled { get; set; }
        bool SurveillanceEnabled { get; set; }
    }
}
