using System;
using System.Web.Http;
using Shared.Common.DI;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Controllers
{
    public abstract class BaseApiController : ApiController
    {
        public IDependencyInjector Di;

        protected BaseApiController(IDependencyInjector di)
        {
            Di = di;
        }

        public IConstantsProvider GetConstantsProvider() => Di.GetInstance<IConstantsProvider>();

        public ITeamProvider GetTeamProvider() => Di.GetInstance<ITeamProvider>();

        protected Team GetTeam()
        {
            return Di.GetInstance<IUserClaims>().GetTeam(GetTeamProvider());
        }

        protected string GetFriendlyName(bool throwExceptionIfNullOrEmpty = true)
        {
            return Get(Di.GetInstance<IUserClaims>().GetFriendlyName(), throwExceptionIfNullOrEmpty, "FriendlyName");
        }

        protected string GetEmail(bool throwExceptionIfNullOrEmpty = true)
        {
            return Get(Di.GetInstance<IUserClaims>().GetEmail(), throwExceptionIfNullOrEmpty, "Email");
        }

        private string Get(string val, bool throwExceptionIfNullOrEmpty, string identifier)
        {
            if (string.IsNullOrEmpty(val) && throwExceptionIfNullOrEmpty)
                throw new Exception("While getting claims: " + identifier + " was null or empty");

            return val;
        }

    }
}