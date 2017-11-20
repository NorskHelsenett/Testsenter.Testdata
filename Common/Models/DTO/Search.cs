using TestdataApp.Common.Models.DbEntities;

namespace TestdataApp.Common.Models.DTO
{
    public class Search
    {
        public SearchQuery SearchQuery { get; set; }
        public SearchParameters SearchParameters { get; set; }
    }
}