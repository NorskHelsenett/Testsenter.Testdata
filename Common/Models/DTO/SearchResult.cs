using System.Collections.Generic;

namespace TestdataApp.Common.Models.DTO
{
    public class SearchResult<T>
    {
        public IEnumerable<T> Documents { get; set; }
        public SearchParameters SearchParameters { get; set; }
    }
}