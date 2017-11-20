using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.WebPages;
using Shared.Common.DI;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Controllers
{
    [Authorize]
    public class SearchController<TPersonIndexEntity, TBusinessIndexEntity> : BaseApiController, ISearchController
        where TPersonIndexEntity : class, IIndexEntity
        where TBusinessIndexEntity : class, IIndexEntity
    {
        private readonly IAzureSearch<TPersonIndexEntity> _personIndex;
        private readonly IAzureSearch<TBusinessIndexEntity> _busIndex;
        private readonly IFilterManager _personFilterManager;
        private readonly IFilterManager _businessFilterManager;
        private readonly IFamilyProvider _familyProvider;
        private readonly string _minimumCriteriaForPerson;
        private readonly string[] _freetextPropertiesForPerson;
        private readonly string _minimumCriteriaForBusiness;
        private readonly string[] _freetextPropertiesForBusiness;
        private readonly string[] _surveillanceSearchOrderBy;
        public const int MaxHitsPerPage = 50;

        public SearchController(IDependencyInjector di, IAzureSearch<TPersonIndexEntity> personIndex, IAzureSearch<TBusinessIndexEntity> busIndex, IPersonFilterManager personFilterManager, IBusinessFilterManager businessFilterManager, IFamilyProvider familyProvider, string minimumCriteriaForPerson = null, string[] freetextPropertiesForPerson = null, string minimumCriteriaForBusiness = "", string[] freetextPropertiesForBusiness = null, string[] surveillanceSearchOrderBy = null) : base(di)
        {
            _personIndex = personIndex;
            _busIndex = busIndex;
            _personFilterManager = personFilterManager;
            _businessFilterManager = businessFilterManager;
            _familyProvider = familyProvider;
            _minimumCriteriaForPerson = minimumCriteriaForPerson;
            _freetextPropertiesForPerson = freetextPropertiesForPerson;
            _minimumCriteriaForBusiness = minimumCriteriaForBusiness;
            _freetextPropertiesForBusiness = freetextPropertiesForBusiness;
            _surveillanceSearchOrderBy = surveillanceSearchOrderBy;
        }

        [HttpPost]
        [Route("api/{environment}/PersonSearch")]
        public virtual async Task<SearchResult<IIndexEntity>> PersonSearch([FromBody] Models.DTO.Search search, string environment)
        {
            return await Search(search, environment, _personFilterManager, _personIndex, _minimumCriteriaForPerson, _freetextPropertiesForPerson);
        }

        [HttpPost]
        [Route("api/{environment}/BusinessSearch")]
        public virtual async Task<SearchResult<IIndexEntity>> BusinessSearch([FromBody] Models.DTO.Search search, string environment)
        {
            return await Search(search, environment, _businessFilterManager, _busIndex, _minimumCriteriaForBusiness, _freetextPropertiesForBusiness);
        }

        [HttpGet]
        [Route("api/Search/ProjectSurveillances/{projectid}")]
        public virtual async Task<IEnumerable<IIndexEntity>> ProjectSurveillances(int projectid)
        {
            var filter = $"teams/any(t: t eq '{projectid}')";
            return await _personIndex.Search(string.Empty, filter, orderBy: _surveillanceSearchOrderBy, top: 100);
        }
        
        [HttpGet]
        [Route("api/Search/Family")]
        public virtual async Task<Family> GetFamily(string nin)
        {
            return await _familyProvider.GetFamily(nin);
        }

        #region Helpers

        private static async Task<SearchResult<IIndexEntity>> Search<T>(Models.DTO.Search search, string environment, IFilterManager fm, IAzureSearch<T> client, string minimumCriteria, string[] freetextFields)
            where T : class, IIndexEntity
        {
            fm.Init(search.SearchQuery.Filters);
            var selected = fm.GetSelectedFilters();
            var query = search.SearchQuery.SearchTerm;

            if (IsAllDigits(query))
                query = RemoveWhiteSpaces(query);

            var filters = CreateAndFilter(selected, minimumCriteria);

            var result = await client.SearchWithFullResult(query, filters, true,
                search.SearchParameters.OrderBy?.ToArray(), search.SearchParameters.NumberPerPage,
                search.SearchParameters.GetSkipCount(),
                searchFields: freetextFields);

            var resultObject = new SearchResult<IIndexEntity>()
            {
                SearchParameters = search.SearchParameters,
                Documents = result.Results.Select(x => x.Document)
            };
            resultObject.SearchParameters.TotalCount = (int)result.Count;

            return resultObject;
        }

        private static string CreateAndFilter(IEnumerable<FilterItem> selected, string personIdAppend)
        {
            var builder = new StringBuilder();
            if (!personIdAppend.IsEmpty())
                builder.Append(personIdAppend + " and ");

            selected?.ToList().ForEach(f =>
                {
                    if (f.Type == FilterType.String)
                        builder.Append(f.FilterString.IsEmpty()
                            ? string.Empty
                            : f.FilterString + "'" + f.Parameter.ToUpper() + "'" + " and ");
                    else
                        builder.Append(f.FilterString.IsEmpty()
                            ? string.Empty
                            : f.FilterString + f.Parameter + " and ");
                }
            );

            if (builder.Length > 5)
                builder.Remove(builder.Length - 5, 5);

            return builder.ToString();
        }

        private static string RemoveWhiteSpaces(string query)
        {
            return query.Replace(" ", "");
        }

        private static bool IsAllDigits(string query)
        {
            return !query.IsEmpty() && query.All(c => char.IsDigit(c) || char.IsWhiteSpace(c));
        }

        #endregion
    }
}
