using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.WebPages;
using Shared.Common.DI;
using Shared.Common.Logic;
using Shared.Common.Storage;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public class FilterController : BaseApiController, IFilterController
    {
        private readonly IJsonStorage<SearchQuery> _queryDb;
        private readonly IFilterManager _personFilterManager;
        private readonly IFilterManager _businessFilterManager;

        public FilterController(IDependencyInjector di) : base(di)
        {
            _personFilterManager = di.GetInstance<IPersonFilterManager>();
            _businessFilterManager = di.GetInstance<IBusinessFilterManager>();
            _queryDb = di.GetInstance<IJsonStorage<SearchQuery>>();
        }

        [HttpGet]
        [Route("api/Filter/{index}")]
        [AllowAnonymous]
        public virtual async Task<IEnumerable<FilterGroup>> GetStartFilters(string index)
        {
            var manager = GetFilterManager(index);
            await manager.Init();
            return manager.GetFilters();
        }
        
        [HttpGet]
        [Route("api/Filter/Saved")]
        public virtual async Task<IEnumerable<SearchQuery>> GetSavedFilters()
        {
            var savedSearces = (await _queryDb.Get(SearchQueryHelper.PartitionKey)).ToList();
            if (!savedSearces.Any())
                return savedSearces;

            var startFiltersMasterPerson = (await GetStartFilters(IndexTypeName.Person.ToString())).ToList();
            var startFiltersMasterBusiness = (await GetStartFilters(IndexTypeName.Business.ToString())).ToList();
            foreach(var q in savedSearces)
            {
                var startFilters = q.SearchIndex == IndexTypeName.Person ? startFiltersMasterPerson.Copy() : startFiltersMasterBusiness.Copy();
                FilterBase.SetSelectedFilters(startFilters, q.SelectedFilters);
                q.Filters = startFilters;
            }

            return savedSearces;
        }

        [HttpPost]
        [Route("api/Filter/Saved")]
        public virtual async Task<SearchQuery> Save([FromBody] SearchQuery query)
        {
            query.CheckValid();
            query.DbName = SearchQueryHelper.GetHash(query.FriendlyName);
            query.SetProject(GetTeam());
            query.RegisteredBy = GetEmail();
            query.RegisteredByFriendlyName = GetFriendlyName();

            var manager = query.SearchIndex == IndexTypeName.Business ? _businessFilterManager : _personFilterManager;
            manager.Init(query.Filters);
            query.SelectedFilters = manager.GetSelectedFilters().ToList();
            var filters = query.Filters;
            query.Filters = null;
            if (!query.SelectedFilters.Any() && query.SearchTerm.IsEmpty())
                throw new ArgumentException("No selected filters was found");

            var result = await _queryDb.Post(query);
            query.Filters = filters;

            return query;
        }

        [HttpDelete]
        [Route("api/Filter/Saved")]
        public virtual async Task<bool> Remove(string dbname)
        {
            var elements = await _queryDb.Get(SearchQueryHelper.PartitionKey);
            if (elements == null || !elements.Any(x => x.DbName == dbname))
                return false;
            var element = elements.First(x => x.DbName == dbname);
            if (element.RegisteredBy != GetEmail())
                throw new ArgumentException("Kan ikke slette dette filteret fordi dette filteret ble laget av en annen");

            return await _queryDb.Delete(element);
        }

        private IFilterManager GetFilterManager(string index)
        {
            return AsIndexEnum(index, true) == IndexTypeName.Business
                ? _businessFilterManager
                : _personFilterManager;
        }

        public static IndexTypeName AsIndexEnum(string s, bool throwExceptionIfNotFound = false)
        {
            foreach (IndexTypeName env in Enum.GetValues(typeof(IndexTypeName)))
            {
                if (string.Equals(s, env.ToString(), StringComparison.CurrentCultureIgnoreCase))
                    return env;
            }

            if (throwExceptionIfNotFound)
                throw new Exception("Didnt find enum matching " + s);

            return IndexTypeName.Ugyldig;
        }
    }
}