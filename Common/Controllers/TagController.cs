using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.WebPages;
using Shared.Common.DI;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public class TagController<TPersonIndexEntity, TBusinessIndexEntity> : BaseApiController
        where TPersonIndexEntity : class, IIndexEntity
        where TBusinessIndexEntity : class, IIndexEntity
    {
        private readonly IAzureSearch<TPersonIndexEntity> _personIndex;
        private readonly IAzureSearch<TBusinessIndexEntity> _busIndex;

        protected TagController(IDependencyInjector di, IAzureSearch<TPersonIndexEntity> personIndex, IAzureSearch<TBusinessIndexEntity> busIndex) : base(di)
        {
            _personIndex = personIndex;
            _busIndex = busIndex;
        }

        [HttpGet]
        [Route("api/Tag/All")]
        public async Task<IEnumerable<Tag>> GetAllTags()
        {
            return (await Di.GetInstance<IJsonStorage<Tag>>()
                .Get(Tag.PartitionKey));
        }

        [HttpDelete]
        [Route("api/Tag/Delete")]
        public virtual async Task<bool> DeleteTag(string tag)
        {
            var hash = GetHash(tag);
            await Di.GetInstance<IJsonStorage<Tag>>().Delete(Tag.PartitionKey, hash);

            await _personIndex.RemoveFromPropertyList(string.Empty, $"tags/any(f: f eq '{hash}' )", "Tags", hash);
            await _busIndex.RemoveFromPropertyList(string.Empty, $"tags/any(f: f eq '{hash}' )", "Tags", hash);

            var searches = await Di.GetInstance<IJsonStorage<SearchQuery>>().Get();
            var searchesWithTags = searches.Where(s => s.SelectedFilters.Any(f => f.Value == hash)).ToList();
            if (!searchesWithTags.Any())
                return true;

            searchesWithTags.ForEach(s => s.SelectedFilters.RemoveAt(s.SelectedFilters.FindIndex(f => f.Value == hash)));
            await Di.GetInstance<IJsonStorage<SearchQuery>>().Put(searchesWithTags);

            var empty = searchesWithTags.Where(s => s.SearchTerm.IsEmpty() && !s.SelectedFilters.Any());
            if(empty.Any())
                await Di.GetInstance<IJsonStorage<SearchQuery>>().Delete(empty);

            return false;
        }

        [HttpPut]
        [Route("api/Tag")]
        public virtual async Task<Tag> AddTag(string commonIdentifier, string tag, string index)
        {
            var dbtag = new Tag
            {
                Name = tag,
                Key = GetHash(tag),
                RegisteredBy = GetFriendlyName()
            };
            dbtag.SetProject(GetTeam());

            if(!dbtag.IsLegal())
                throw new Exception("Tag var ugyldig");

            await Di.GetInstance<IJsonStorage<Tag>>().Put(dbtag);
            if(String.Equals(index, IndexTypeName.Person.ToString(), StringComparison.CurrentCultureIgnoreCase))
                await _personIndex.AddToPropertyList(commonIdentifier, "Tags", dbtag.Key);
            else
                await _busIndex.AddToPropertyList(commonIdentifier, "Tags", dbtag.Key);

            return dbtag;
        }

        [HttpDelete]
        [Route("api/Tag")]
        public virtual async Task<bool> RemoveTagFromPerson(string commonIdentifier, string tag, string index)
        {
            if(String.Equals(index, IndexTypeName.Person.ToString(), StringComparison.CurrentCultureIgnoreCase))
                await _personIndex.RemoveFromPropertyList(commonIdentifier, "Tags", GetHash(tag));
            else
                await _busIndex.RemoveFromPropertyList(commonIdentifier, "Tags", GetHash(tag));

            return true;
        }

        public static string GetHash(string tag)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(tag);
            return Convert.ToBase64String(plainTextBytes);
        }
    }
}