using System.Collections.Generic;

namespace TestdataApp.Common.Models.DTO
{
    public class SearchParameters
    {
        public int Page { get; set; } = 0;
        public int NumberPerPage { get; set; } = 50;
        public IEnumerable<string> OrderBy { get; set; }
        public int Environment { get; set; }
        public int TotalCount { get; set; }

        public int GetSkipCount() => NumberPerPage * Page;
    }
}