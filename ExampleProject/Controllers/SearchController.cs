using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Shared.Common.DI;
using TestdataApp.Common.Controllers;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.Common.Search;

namespace TestdataApp.ExampleProject.Controllers
{
    [Authorize]
    public class SearchController : SearchController<RegisterPersonModel, RegisterBusinessModel>, ISearchController
    {

        public SearchController(IDependencyInjector di) : 
            base(di,
                 di.GetInstance<IAzureSearch<RegisterPersonModel>>(),
                 di.GetInstance<IAzureSearch<RegisterBusinessModel>>(),
                 di.GetInstance<IPersonFilterManager>(),
                 di.GetInstance<IBusinessFilterManager>(),
                 di.GetInstance<IFamilyProvider>(),
                "(isInPreg or isInHpr or isInFlr)", new[] { "nin", "hprNrStr", "hprName", "pregName", "difiEmail", "difiPhoneNumber" }, surveillanceSearchOrderBy: new []{ "pregName", "hprName" })
        {
        }

        [HttpPost]
        [Route("api/{environment}/PersonSearch")]
        public override async Task<SearchResult<IIndexEntity>> PersonSearch([FromBody] TestdataApp.Common.Models.DTO.Search search, string environment) => await base.PersonSearch(search, environment);
       
        [HttpPost]
        [Route("api/{environment}/BusinessSearch")]
        public override async Task<SearchResult<IIndexEntity>> BusinessSearch([FromBody] TestdataApp.Common.Models.DTO.Search search, string environment) => await base.BusinessSearch(search, environment);
        
        [HttpGet]
        [Route("api/Search/ProjectSurveillances/{projectid}")]
        public override async Task<IEnumerable<IIndexEntity>> ProjectSurveillances(int projectid) => await base.ProjectSurveillances(projectid);

        [HttpGet]
        [Route("api/Search/Family")]
        public async Task<Family> GetFamily(string nin) => await base.GetFamily(nin);

    }
}
