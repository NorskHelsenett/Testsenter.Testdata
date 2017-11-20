using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface IDetailsController
    {
        [HttpPost]
        [Route("api/{environment}/Details/Person")]
        Task<IDetails> GetPersonDetails([ModelBinder(typeof(PersonIndexEntityModelBinder))] IIndexEntity item, string environment);

        [HttpPost]
        [Route("api/{environment}/Details/Business")]
        Task<IDetails> GetBusinessDetails([ModelBinder(typeof(BusinessIndexEntityModelBinder))] IIndexEntity item, string environment);

        [HttpGet]
        [Route("api/Details/Comment")]
        Task<IEnumerable<Comment>> LatestCommentsForProject();

        [HttpPost]
        [Route("api/Details/Comment")]
        Task<Comment> AddComment(Comment comment);

        [HttpDelete]
        [Route("api/Details/Comment")]
        Task<bool> RemoveComment(string key, string commonIdentifier);
    }
}