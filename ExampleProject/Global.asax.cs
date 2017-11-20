using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using log4net;
using Newtonsoft.Json.Serialization;
using Shared.Common.Azure;
using Shared.Common.Azure.DI;
using Shared.Common.DI;
using Shared.Common.Resources;
using TestdataApp.Common;
using TestdataApp.ExampleProject.Config;

namespace TestdataApp.ExampleProject
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private static IDependencyInjector _di;
        public static IDependencyInjector Di
        {
            get
            {
                if (_di == null)
                    _di = GetDi();

                return _di;
            }
        }

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            DependencyResolver.SetResolver(new UnityResolver(Di));
            GlobalConfiguration.Configure(RegisterApiDependencyInjector);
        }

        protected void Application_Stop()
        {
            var logger = _di.GetInstance<ILog>();
            var id = Guid.NewGuid().ToString();
            logger.Debug($"[{id}] Hodor-Web: Shutdown requested");
            logger.Debug($"[{id}] Hodor-Web: Closing connections");

        }

        private static void RegisterApiDependencyInjector(HttpConfiguration config)
        {
            config.DependencyResolver = new UnityResolver(Di);
        }

        private static DiRegistrations GetDi()
        {
            var azureConfReader = new AzureSettingsReader();
            var currentEnvironment = azureConfReader.GetRunningEnvironment();

            return new DiRegistrations(new ExampleConstantsProvider(), new ServiceDescription("ExampleProject", currentEnvironment, true, true), new DiHelper(), true);
        }
    }
}
