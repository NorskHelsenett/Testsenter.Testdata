using System.ComponentModel.DataAnnotations;
using Microsoft.Azure.Search;
using Shared.Common.Storage;

namespace TestdataApp.Common.Search
{
    public interface IIndexEntity : IJsonStorageEntity
    {
        [Key]
        string CommonIdentifier { get; set; }
        [IsFilterable]
        string[] Teams { get; set; }
        [IsFilterable]
        string[] Tags { get; set; }
    }
}
