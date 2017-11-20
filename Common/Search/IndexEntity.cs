using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Search;

namespace TestdataApp.Common.Search
{
    public class IndexEntity : IIndexEntity
    {
        public const string All = "All";

        [Key]
        public string CommonIdentifier { get; set; }
        [IsFilterable]
        public string[] Teams { get; set; }
        [IsFilterable]
        public string[] Tags { get; set; }

        public virtual string GetPartitionKey()
        {
            return All;
        }

        public string GetRowKey()
        {
            return CommonIdentifier;
        }
    }
}
