using System;
using System.Web.Http.Filters;
using System.Web.Mvc;
using log4net;
using IExceptionFilter = System.Web.Http.Filters.IExceptionFilter;

namespace TestdataApp.ExampleProject{
    public class FilterConfig
    {
        internal static void HandleException(Exception e, string additionalMessage = "")
        {
            var logger = MvcApplication.Di.GetInstance<ILog>();

            try
            {
                logger.Error(e);
            }
            catch (Exception) { }
        }

        public class WebApiLogExceptionHandlerAttribute : ExceptionFilterAttribute, IExceptionFilter
        {
            public override void OnException(HttpActionExecutedContext context)
            {
                HandleException(context.Exception);
                base.OnException(context);
            }
        }

        public class MvcLogExceptionHandlerAttribute : HandleErrorAttribute
        {
            public override void OnException(ExceptionContext filterContext)
            {
                HandleException(filterContext.Exception);
                base.OnException(filterContext);
            }
        }
    }
}