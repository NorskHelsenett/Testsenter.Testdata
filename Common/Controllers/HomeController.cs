using System.Web.Mvc;
using TestdataApp.Common.Controllers.Interfaces;

namespace TestdataApp.Common.Controllers
{
    public class HomeController : Controller, IHomeController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}