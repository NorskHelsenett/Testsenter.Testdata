using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestdataApp.Common.Models.DTO.Filter
{
    public interface IFilterManager
    {
        Task Init();
        void Init(List<FilterGroup> filters);
        IEnumerable<FilterGroup> GetFilters();
        IEnumerable<FilterItem> GetSelectedFilters();
    }
}