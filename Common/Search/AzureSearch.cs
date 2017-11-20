using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Shared.Common.Logic;
using Index = Microsoft.Azure.Search.Models.Index;

namespace TestdataApp.Common.Search
{
    public class AzureSearch<TEntityType> : IAzureSearch<TEntityType> where TEntityType : class, IIndexEntity
    {
        private readonly object _creationLock = new object();
        
        private readonly SimpleCache _cache;
        private ISearchIndexClient _indexClient;

        private ISearchIndexClient IndexClient
        {
            get
            {
                if(_indexClient != null && !_cache.CheckTimeOut())
                    return _indexClient;

                lock (_creationLock)
                {
                    if (_indexClient != null && !_cache.CheckTimeOut())
                        return _indexClient;

                    _cache.TimeOut();

                    _indexClient = GetSearchServiceClient().Indexes.GetClient(_indexName);

                    return _indexClient;
                }
            }
        }

        private readonly string _searchServiceName;
        private readonly string _queryApiKey;
        private readonly string _indexName;

        public AzureSearch(string searchServiceName, string queryApiKey, string indexName)
        {
            _cache = new SimpleCache(30);
            _searchServiceName = searchServiceName;
            _queryApiKey = queryApiKey;
            _indexName = indexName.ToLower();
        }

        public async Task<TEntityType> GetByKey(string key, bool throwExceptionIfNotFound = false)
        {
            try
            {
                return await IndexClient.Documents.GetAsync<TEntityType>(key);
            }
            catch (Exception) when (!throwExceptionIfNotFound)
            {
                return null;
            }
        }

        public async Task<IEnumerable<TEntityType>> Search(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null)
        {
            var res = await SearchWithFullResult(searchKey, filter, count, orderBy, top, skip, select, searchFields);
            return res.Results.Select(x => x.Document);
        }

        public async Task<DocumentSearchResult<TEntityType>> SearchWithFullResult(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null)
        {
            SearchParameters parameters =
                new SearchParameters
                {
                    Filter = string.IsNullOrEmpty(filter) ? string.Empty : filter,
                    Select = @select ?? new string[] { "*" },
                    IncludeTotalResultCount = count,
                    SearchMode = SearchMode.All,
                    OrderBy = orderBy,
                    Top = top,
                    Skip = skip,
                };

            if (searchFields != null)
                parameters.SearchFields = searchFields;

            var results = await IndexClient.Documents.SearchAsync<TEntityType>(string.IsNullOrEmpty(searchKey) ? "*" : searchKey, parameters);

            return results;
        }

        public async Task<IEnumerable<TEntityType>> GetCompleteSet(string searchKey, string filter, string[] select = null, int takeCount = 1000)
        {
            var skippy = 0;

            SearchParameters parameters = new SearchParameters()
                {
                    Filter = string.IsNullOrEmpty(filter) ? string.Empty : filter,
                    Select = @select ?? new string[] { "*" },
                    IncludeTotalResultCount = true,
                    SearchMode = SearchMode.All,
                    Skip = skippy,
                    Top = takeCount
            };

            SearchContinuationToken continuationToken = null;
            var result = new List<TEntityType>();
            var limitSearch =
                await IndexClient.Documents.SearchAsync<TEntityType>(
                    string.IsNullOrWhiteSpace(searchKey) ? "*" : searchKey, parameters);
            var upperLimit = limitSearch.Count > 100000 ? 100000 : limitSearch.Count;
            parameters.IncludeTotalResultCount = false;
            while(skippy < upperLimit)
            {
                parameters.Skip = skippy;

                var thisResult = await IndexClient.Documents.SearchAsync<TEntityType>(string.IsNullOrEmpty(searchKey) ? "*" : searchKey, parameters);

                result.AddRange(thisResult.Results.Select(x => x.Document));
                continuationToken = thisResult.ContinuationToken;

                skippy += thisResult.Results.Count;

            }

            return result;
        }

        public async Task MergeOrUploadBatch(TEntityType[] entities)
        {
            var batch = IndexBatch.MergeOrUpload(entities);
            await IndexClient.Documents.IndexAsync(batch);
        }

        public async Task UploadBatch(TEntityType[] entities)
        {
            var batch = IndexBatch.Upload(entities);
            await IndexClient.Documents.IndexAsync(batch);
        }

        public async Task AddOrUpdateEntity(TEntityType entity, bool removeOldValues = false)
        {
            var batch = removeOldValues ? IndexBatch.Upload(new List<TEntityType>() { entity }) : IndexBatch.MergeOrUpload(new List<TEntityType>() { entity });
            try
            {
                var res = await IndexClient.Documents.IndexAsync(batch);
            }
            catch (IndexBatchException e)
            {
                Console.WriteLine(
                    "Failed to index some of the documents: {0}", 
                    string.Join(", ", e.IndexingResults.Where(r => !r.Succeeded).Select(r => r.Key)));
            }
        }

        private SearchServiceClient GetSearchServiceClient()
        {
            var client = new SearchServiceClient(_searchServiceName, new SearchCredentials(_queryApiKey));
            CreateIndexIfNotExists(client, _indexName);

            return client;
        }

        private static void CreateIndexIfNotExists(SearchServiceClient client, string indexname)
        {
            Console.WriteLine(client.Indexes);
            if (client.Indexes.Exists(indexname))
                return;

            var definition = new Index()
            {
                Name = indexname,
                Fields = FieldBuilder.BuildForType<TEntityType>()
            };

            client.Indexes.Create(definition);
        }

        public async Task RemoveFromIndex(TEntityType[] entities)
        { 
            var batch = IndexBatch.Delete(entities);
            await IndexClient.Documents.IndexAsync(batch);
        }

        public async Task UpdateSearchIndexes(bool fieldsAreChanged = false, bool newIndex = false)
        {
            var client = GetSearchServiceClient();
            if (!client.Indexes.Exists(_indexName) && !newIndex)
                return;

            //if (fieldsAreChanged) //dangerous.should only be commented in if you really mean it(will delete all data)
            //    client.Indexes.Delete(_indexName);

            var definition = new Index()
            {
                Name = _indexName,
                Fields = FieldBuilder.BuildForType<TEntityType>()
            };

            var res = await client.Indexes.CreateOrUpdateAsync(definition);

            client.Dispose();
        }

        public string GetConnectionInfo()
        {
            return $"BaseUri: {IndexClient.BaseUri} Indexes: {string.Join(",", GetSearchServiceClient().Indexes.ListNames().ToArray())}";
        }

        public async Task AddToPropertyList(string entityKey, string propertyName, string appendThisValue)
        {
            var entity = await IndexClient.Documents.GetAsync<TEntityType>(entityKey, new List<string> { "*" });
            if (entity == null)
                throw new Exception("Fant ikke objekt med nøkkel " + entityKey);

            PropertyInfo pi = entity.GetType().GetProperty(propertyName);

            var arr = (string[])pi.GetValue(entity, null);
            if (arr == null)
                arr = new[] { appendThisValue };

            else if (arr.Any(s => s == appendThisValue))
                return;
            else
            {
                var tmp = new string[arr.Length + 1];
                for (int i = 0; i < arr.Length; i++)
                    tmp[i] = arr[i];

                tmp[tmp.Length - 1] = appendThisValue;
                arr = tmp;
            }

            pi.SetValue(entity, arr);

            await AddOrUpdateEntity(entity);
        }

        public async Task RemoveFromPropertyList(string searchTerm, string filter, string propertyName, string removeThisValue)
        {
            var entities = (await GetCompleteSet(searchTerm, filter)).ToList();
            if (!entities.Any())
                return;
            entities.ForEach(entity => RemovePropertyFromEntity(entity, propertyName, removeThisValue));
            await MergeOrUploadBatch(entities.ToArray());
        }

        public async Task RemoveFromPropertyList(string entityKey, string propertyName, string removeThisValue)
        {
            var entity = await IndexClient.Documents.GetAsync<TEntityType>(entityKey, new List<string> { "*" });
            if (entity == null)
                throw new Exception("Fant ikke objekt med nøkkel " + entityKey);

            entity = RemovePropertyFromEntity(entity, propertyName, removeThisValue);

            await AddOrUpdateEntity(entity);
        }

        private TEntityType RemovePropertyFromEntity(TEntityType entity, string propertyName, string removeThisValue)
        {
            PropertyInfo pi = entity.GetType().GetProperty(propertyName);

            var arr = (string[])pi.GetValue(entity, null);
            if (arr == null)
                return entity;

            if (arr.All(v => v != removeThisValue))
                return entity;

            var asList = arr.ToList();
            asList.Remove(removeThisValue);
            arr = asList.ToArray();

            pi.SetValue(entity, arr);
            return entity;
        }

        public string GetIndexInfo()
        {
            var s = IndexClient.BaseUri.ToString();
            return s;
        }
    }
}