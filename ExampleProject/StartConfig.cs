using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartup(typeof(TestdataApp.ExampleProject.StartConfig))]
namespace TestdataApp.ExampleProject
{
    public partial class StartConfig
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuthentication(app);
        }

        public void ConfigureAuthentication(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/login/")
            });
        }
    }
}