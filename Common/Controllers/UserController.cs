using System;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.WebPages;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Shared.Common.DI;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public class UserController : BaseApiController, IUserController
    {
        private readonly IUserManager _userManager;
        private readonly IUserClaims _userClaims;

        public UserController(IDependencyInjector di, IUserManager userManager, IUserClaims userClaims) : base(di)
        {
            _userManager = userManager;
            _userClaims = userClaims;
        }

        [HttpDelete]
        [Route("api/Users/{email}")]
        [Authorize(Roles = "Admin")]
        public bool DeleteUser(string email)
        {
            //har ikke view for dette
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("api/Users/Refresh")]
        public bool RefreshCache()
        {
            return true;
        }

        [HttpPost]
        [Route("api/User/Login")]
        [AllowAnonymous]
        public string Login([FromBody] LoginSubmisson data)
        {
            data.Username = data.Username.ToLower();

            if (!_userManager.UserExists(data.Username))
                return "Det eksisterer ikke en bruker med dette brukernavnet";

            string errorMessageWhenUserActivationIsPending;
            if (_userManager.UserActivationPending(data.Username, out errorMessageWhenUserActivationIsPending))
            {
                return errorMessageWhenUserActivationIsPending;
            }

            if (!_userManager.PasswordCorrect(data.Username, data.Password))
                return "Kombinasjonen epostadresse/passord var feil";

            SignIn(_userManager.GetClaimsIdentity(data.Username));

            return "success";
        }

        [HttpGet]
        [Route("api/User/Logout")]
        public bool LogOut()
        {
            Request.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return true;
        }

        [HttpGet]
        [Route("api/User/GetUser")]
        public UserData GetUser()
        {
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
                return null;

            var user = _userManager.GetUserDetails(_userClaims.GetEmail().ToLower(), GetTeam().Name);
            return new UserData
            {
                Username = user.Username,
                ProjectValue = user.ProjectValue,
                RoleValue = user.RoleValue,
                Name = user.Name,
                RegisterUserName = user.RegisterUserName,
                SearchApiKey = user.SearchApiKey
            };
        }

        [HttpGet]
        [Route("api/User/IsLoggedIn")]
        [AllowAnonymous]
        public bool IsLoggedIn()
        {
            return HttpContext.Current.User.Identity.IsAuthenticated;
        }

        [HttpGet]
        [Route("api/User/ValidUserInformation")]
        public bool ValidUserInformation()
        {
            return _userManager.ValidUserInformation(_userClaims.GetEmail().ToLower());
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("api/User/CreateUser")]
        public async Task<string> CreateUser(UserData data)
        {
            return await _userManager.CreateUser(data);
        }

        [HttpPut]
        [Route("api/User/UpdateUserDetails")]
        public string UpdateUserDetails([FromBody] UserData updatedUser)
        {
            if (!IsLoggedIn())
                return null;

            var username = _userClaims.GetEmail().ToLower();

            if (!updatedUser.OldPassword.IsEmpty())
            {
                if (!_userManager.UpdatePassword(username, updatedUser.OldPassword, updatedUser.Password))
                    return "Oppgitt nåværendepassord er ikke korrekt, ingen av endringene dine ble lagret";
            }
            if (!updatedUser.Password.IsEmpty() && updatedUser.OldPassword.IsEmpty())
            {
                return "Du må oppgi ditt nåværende passord for å kunne endre passordet ditt";
            }

            _userManager.UpdateUser(username, updatedUser.Name, updatedUser.RoleValue, updatedUser.ProjectValue);
            
            SignIn(_userManager.GetClaimsIdentity(username));

            return "success";
        }

        [HttpPost]
        [Route("api/User/UpdateRegisterUser")]
        public async Task<bool> UpdateRegisterUser([FromBody] LoginSubmisson info)
        {
            if (!await CheckRegisterUser(info))
                return false;

            var username = _userClaims.GetEmail().ToLower();
            _userManager.UpdateRegisterUserToDb(username, info);
            SignIn(_userManager.GetClaimsIdentity(username));

            return true;
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("api/User/GenerateNewPassword/{email}")]
        public string GenerateNewPassord(string email)
        {
            email = email.ToLower();

            if (_userManager.UserExists(email))
            {
                return "Det er ikke registert en bruker med dette brukernavnet";
            }
            string x;
            if (_userManager.UserActivationPending(email, out x))
            {
                return x;
            }

            var newpassword = _userManager.GenerateAndSetNewPassword(email);
            _userManager.NotifyUserOfNewPassword(email, newpassword);
           
            return "success";
        }


        [HttpPost]
        [Route("api/User/CheckRegisterUser")]
        [AllowAnonymous]
        public async Task<bool> CheckRegisterUser([FromBody] LoginSubmisson info)
        {
            if (info.Password.IsEmpty() || info.Username.IsEmpty())
                return false;

            return await _userManager.CheckRegisterUser(info);
        }

        [HttpGet]
        [Route("api/User/HasValidRegisterUser")]
        public async Task<bool> HasValidRegisterUser()
        {
            return await _userManager.HasValidRegisterUser(_userClaims.GetEmail().ToLower());
        }

        private void SignIn(ClaimsIdentity userId)
        {
            Request.GetOwinContext().Authentication.SignIn(
                new AuthenticationProperties
                {
                    IsPersistent = true,
                    ExpiresUtc = DateTime.Now.AddDays(7)
                }, userId);
            
        }
    }
}
