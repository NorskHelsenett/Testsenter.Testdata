using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Security;

namespace TestdataApp.ExampleProject.User
{
    public class UserManager : IUserManager
    {
        public Dictionary<string, UserData> Db { get; set; }
        public UserManager()
        {
            Db = new Dictionary<string, UserData>();
        }

        private void CreateIfNotExists(string username)
        {
            if (!Db.ContainsKey(username))
                Db.Add(username, new UserData()
                {
                    HasAcceptedTerms = true,
                    HasValidRegisterUser = true,
                    Name = username,
                    ProjectValue = 1,
                    RoleValue = 1,
                    Username = username,
                });
        }

        public UserData GetUserDetails(string username, string teamName)
        {
            CreateIfNotExists(username);

             return Db[username];
        }

        public bool UserExists(string username)
        {
            return true;
        }

        public bool UserActivationPending(string username, out string errorMessageWhenUserActivationIsPending)
        {
            errorMessageWhenUserActivationIsPending = "";
            return false;
        }

        public bool PasswordCorrect(string username, string password)
        {
            return true;
        }

        public ClaimsIdentity GetClaimsIdentity(string username)
        {
            CreateIfNotExists(username);
            var user = Db[username];

            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, user.Name));
            claims.Add(new Claim(ClaimTypes.Email, user.Username));
            claims.Add(new Claim(ClaimTypes.System, JsonConvert.SerializeObject( new []{ user.ProjectValue })));
            return new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
        }

        public bool ValidUserInformation(string username)
        {
            return true;
        }

        public async Task<string> CreateUser(UserData data)
        {
            Db.Add(data.Username, data);
            return data.Username;
        }

        public bool UpdatePassword(string username, string oldpassword, string newpassword)
        {
            return true;
        }

        public void UpdateUser(string username, string newFriendlyName, int newProjectRole, int newProjectValue)
        {
            
        }

        public string GenerateAndSetNewPassword(string username)
        {
            return "";
        }

        public void NotifyUserOfNewPassword(string email, string newpassword)
        {
        }

        public async Task<bool> CheckRegisterUser(LoginSubmisson info)
        {
            return true;
        }

        public async Task<bool> HasValidRegisterUser(string username)
        {
            return true;
        }

        public bool UpdateRegisterUserToDb(string username, LoginSubmisson form)
        {
            return true;
        }
    }
}