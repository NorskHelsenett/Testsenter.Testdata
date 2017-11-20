using System.Threading.Tasks;
using TestdataApp.Common.Models.DTO;

namespace TestdataApp.Common.Search
{
    public interface IFamilyProvider
    {
        Task<Family> GetFamily(string personPnr);
    }
}
