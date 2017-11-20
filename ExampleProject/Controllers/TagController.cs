using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Shared.Common.DI;
using TestdataApp.Common.Controllers;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;

namespace TestdataApp.ExampleProject.Controllers
{
    [FilterConfig.WebApiLogExceptionHandlerAttribute]
    public class TagController : TagController<RegisterPersonModel, RegisterBusinessModel>, ITagController
    {
        public TagController(IDependencyInjector di) : base(di, di.GetInstance<IAzureSearch<RegisterPersonModel>>(), di.GetInstance<IAzureSearch<RegisterBusinessModel>>())
        {
        }

        [HttpGet]
        [Route("api/Tag/All")]
        public async Task<IEnumerable<Tag>> GetAllTags()
        {
            return await base.GetAllTags();
        }

        [HttpPut]
        [Route("api/Tag")]
        public async Task<Tag> AddTag(string commonIdentifier, string tag, string index)
        {
            return await base.AddTag(commonIdentifier, tag, index);
        }

        [HttpDelete]
        [Route("api/Tag")]
        public async Task<bool> RemoveTagFromPerson(string commonIdentifier, string tag, string index)
        {
            return await base.RemoveTagFromPerson(commonIdentifier, tag, index);
        }

        [HttpDelete]
        [Route("api/Tag/Delete")]
        public async Task<bool> DeleteTag(string tag)
        {
            return await base.DeleteTag(tag);
        }
    }
}