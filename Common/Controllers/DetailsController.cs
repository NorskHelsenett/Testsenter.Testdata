using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Shared.Common.DI;
using Shared.Common.Storage;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public class DetailsController : BaseApiController, IDetailsController
    {
        private IDetailsProvider _detailsProvider;

        public DetailsController(IDependencyInjector di) : base(di)
        {
            _detailsProvider = di.GetInstance<IDetailsProvider>();
        }

        [HttpPost]
        [Route("api/{environment}/Details/Person")]
        public virtual async Task<IDetails> GetPersonDetails([ModelBinder(typeof(PersonIndexEntityModelBinder))] IIndexEntity item, string environment)
        {
            var super = await _detailsProvider.GetPersonDetails(item, environment, GetTeam());
            return await GetDetails(item, super);
        }

        [HttpPost]
        [Route("api/{environment}/Details/Business")]
        public virtual async Task<IDetails> GetBusinessDetails([ModelBinder(typeof(BusinessIndexEntityModelBinder))] IIndexEntity item, string environment)
        {
            var super = await _detailsProvider.GetBusinessDetails(item, environment, GetTeam());
            return await GetDetails(item, super);
        }
        
        [HttpGet]
        [Route("api/Details/Comment")]
        public virtual async Task<IEnumerable<Comment>> LatestCommentsForProject()
        {
            var comment = await Di.GetInstance<IJsonStorage<Comment>>().Get();
            return comment.Where(c => c.TeamProjectInt == GetTeam().Id).Take(10);
        }

        [HttpPost]
        [Route("api/Details/Comment")]
        public virtual async Task<Comment> AddComment([FromBody] Comment comment)
        {
            comment.IsLegal();

            comment.RegisteredBy = GetEmail();
            comment.RegisteredByFriendlyName = GetFriendlyName();
            comment.CreatedAt = DateTime.Now;
            comment.Key = Guid.NewGuid().ToString();
            comment.SetProject(GetTeam());

            await Di.GetInstance<IJsonStorage<Comment>>().Post(comment);

            return comment;
        }

        private async Task<IDetails> GetDetails(IIndexEntity item, IDetails super)
        {
            if (super.CommentsEnabled)
                super.SetComments(await Di.GetInstance<IJsonStorage<Comment>>().Get(item.CommonIdentifier));

            return super;
        }

        [HttpDelete]
        [Route("api/Details/Comment")]
        public async Task<bool> RemoveComment(string key, string commonIdentifier)
        {
            if (string.IsNullOrEmpty(key))
                return false;

            var comment = await Di.GetInstance<IJsonStorage<Comment>>().Get(commonIdentifier, key);
            if (comment.RegisteredBy != GetEmail())
                throw new Exception("Du kan ikke slette andres kommentarer");

            return await Di.GetInstance<IJsonStorage<Comment>>().Delete(comment);
        }

       
    }
}