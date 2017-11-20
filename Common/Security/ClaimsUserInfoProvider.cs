using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using Newtonsoft.Json;

namespace TestdataApp.Common.Security
{
    public class ClaimsUserInfoProvider : IUserClaims
    {
        protected IEnumerable<Claim> GetCurrentClaims()
        {
            return ((ClaimsIdentity) Thread.CurrentPrincipal?.Identity)?.Claims;
        }

        public Team GetTeam(ITeamProvider tp)
        {
            var claim = GetCurrentClaims().FirstOrDefault(x => x.Type == ClaimTypes.System);
            if (claim?.Value == null) 
                throw new ArgumentException("Could not find Team in Claims"); ;

            var values = JsonConvert.DeserializeObject<int[]>(claim.Value);
            if(values == null || values.Length == 0)
                throw new ArgumentException("Could not find Team in Claims");
           if(values.Length > 1)
                    throw new ArgumentException("User have more than one team in claims. Application does not support this yet");

            return tp.GetTeam(values[0]);
        }

        public string GetFriendlyName()
        {
            return GetCurrentClaims().First(x => x.Type == ClaimTypes.Name).Value;
        }

        public string GetEmail()
        {
            return GetCurrentClaims().FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        }
    }
}