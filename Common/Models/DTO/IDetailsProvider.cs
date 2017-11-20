using System.Threading.Tasks;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DTO
{
    public interface IDetailsProvider
    {
        Task<IDetails> GetPersonDetails(IIndexEntity item, string environment, Team teamForLoggedInUser);

        Task<IDetails> GetBusinessDetails(IIndexEntity item, string environment, Team teamForLoggedInUser);
    }
}
