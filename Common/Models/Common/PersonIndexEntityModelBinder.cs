using System;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using Newtonsoft.Json;

namespace TestdataApp.Common.Models.Common
{
    public class PersonIndexEntityModelBinder : IModelBinder
    {
        public static Type StrongType { get; set; }

        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            var content = actionContext.Request.Content;
            string json = content.ReadAsStringAsync().Result;

            var obj = JsonConvert.DeserializeObject(json, StrongType);

            bindingContext.Model = obj;
            return true;
        }
    }
}
