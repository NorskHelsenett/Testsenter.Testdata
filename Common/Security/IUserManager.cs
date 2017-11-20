using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using TestdataApp.Common.Models.DTO;

namespace TestdataApp.Common.Security
{
    public interface IUserManager
    {
        UserData GetUserDetails(string username, string teamName);
        bool UserExists(string username);
        bool UserActivationPending(string username, out string errorMessageWhenUserActivationIsPending);
        bool PasswordCorrect(string username, string password);
        ClaimsIdentity GetClaimsIdentity(string username);
        bool ValidUserInformation(string username);
        Task<string> CreateUser(UserData data);
        bool UpdatePassword(string username, string oldpassword, string newpassword);
        void UpdateUser(string username, string newFriendlyName, int newProjectRole, int newProjectValue);
        string GenerateAndSetNewPassword(string username);
        void NotifyUserOfNewPassword(string email, string newpassword);

        //registers
        Task<bool> CheckRegisterUser([FromBody] LoginSubmisson info);
        Task<bool> HasValidRegisterUser(string username);
        bool UpdateRegisterUserToDb(string username, LoginSubmisson form);
    }
}
