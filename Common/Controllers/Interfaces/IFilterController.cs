using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO.Filter;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface IFilterController
    {
        //Task<IEnumerable<FilterGroup>> GetStartFilters();
        Task<IEnumerable<FilterGroup>> GetStartFilters(string index);
        Task<IEnumerable<SearchQuery>> GetSavedFilters();
        Task<SearchQuery> Save([FromBody] SearchQuery query);
        Task<bool> Remove(string name);
    }
}