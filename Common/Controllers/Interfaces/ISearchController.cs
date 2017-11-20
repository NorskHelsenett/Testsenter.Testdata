using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface ISearchController
    {
        Task<SearchResult<IIndexEntity>> PersonSearch([FromBody] Models.DTO.Search search, string environment);
        Task<SearchResult<IIndexEntity>> BusinessSearch([FromBody] Models.DTO.Search search, string environment);
        Task<IEnumerable<IIndexEntity>> ProjectSurveillances(int projectid);
        Task<Family> GetFamily(string nin);
    }
}