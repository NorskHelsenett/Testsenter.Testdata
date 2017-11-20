using System.Threading.Tasks;
using System.Web.Http;
using TestdataApp.Common.Models.DTO;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface IUserController
    {
        string Login([FromBody] LoginSubmisson data);
        bool LogOut();
        UserData GetUser();
        bool IsLoggedIn();
        bool ValidUserInformation();
        Task<string> CreateUser(UserData data);
        string UpdateUserDetails([FromBody] UserData updatedUser);
        Task<bool> UpdateRegisterUser([FromBody] LoginSubmisson info);
        string GenerateNewPassord(string email);
        Task<bool> CheckRegisterUser([FromBody] LoginSubmisson info);
        Task<bool> HasValidRegisterUser();
    }
}
