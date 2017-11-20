using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.Azure.Search.Models;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Search;

namespace TestdataApp.ExampleProject.Config.Mock
{
    public class MockBusinessAzureSearch : IAzureSearch<RegisterBusinessModel>
    {
        public Dictionary<string, RegisterBusinessModel> Db { get; set; }
        private bool _simulateDelay = true;

        public MockBusinessAzureSearch()
        {
            Db = new Dictionary<string, RegisterBusinessModel>();
        }

        public Task<RegisterBusinessModel> GetByKey(string key, bool throwExceptionIfNotFound = false)
        {
            var exists = Db.ContainsKey(key);

            if (!exists)
            {
                if (throwExceptionIfNotFound)
                    throw new ArgumentException();
                return Task.FromResult<RegisterBusinessModel>(null);
            }

            return !Db.ContainsKey(key) ? Task.FromResult<RegisterBusinessModel>(null) : Task.FromResult(Db[key]);
        }

        public async Task<DocumentSearchResult<RegisterBusinessModel>> SearchWithFullResult(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] @select = null, string[] searchFields = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<RegisterBusinessModel>> Search(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null)
        {
            var findthis = searchKey.ToLower();
            var orgSearch = string.IsNullOrEmpty(filter) || !filter.Contains("nin eq") ? null : filter.Split(' ')[2].Substring(1, 11);
            var result = new List<RegisterBusinessModel>();

            foreach (var value in Db.Values)
            {


                    if (!string.IsNullOrEmpty(orgSearch) && value?.OrganizationNumber == orgSearch)
                        result.Add(value);

                    else if (value.Tags != null && value.Tags.Any(t => t == findthis))
                        result.Add(value);
                

            }

            return Task.FromResult(result.AsEnumerable());
        }

        public Task<IEnumerable<RegisterBusinessModel>> GetCompleteSet(string searchKey, string filter, string[] select = null, int takeCount = 1000)
        {
            return Search(searchKey, filter, @select: select, top: takeCount);
        }

        public async Task AddToPropertyList(string entityKey, string propertyName, string appendThisValue)
        {
            var entity = Db.Values.SingleOrDefault(x => x.CommonIdentifier == entityKey);
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

            await SimulateDelay();
        }

        public async Task RemoveFromPropertyList(string entityKey, string propertyName, string removeThisValue)
        {
            var entity = Db.Values.SingleOrDefault(x => x.CommonIdentifier == entityKey);
            if (entity == null)
                throw new Exception("Fant ikke objekt med nøkkel " + entityKey);

            PropertyInfo pi = entity.GetType().GetProperty(propertyName);

            var arr = (string[])pi.GetValue(entity, null);
            if (arr == null)
                return;

            if (arr.All(v => v != removeThisValue))
                return;

            var asList = arr.ToList();
            asList.Remove(removeThisValue);
            arr = asList.ToArray();

            pi.SetValue(entity, arr);

            await SimulateDelay();
        }

        public async Task AddOrUpdateEntity(RegisterBusinessModel entity, bool removeOldValues = false)
        {
            if (!Db.ContainsKey(entity.CommonIdentifier))
                Db.Add(entity.CommonIdentifier, entity);
            else
            {
                var tmp = RegisterBusinessLogic.Merge(Db[entity.CommonIdentifier], entity, true);
                Db[entity.CommonIdentifier] = tmp;
            }

            if (_simulateDelay)
                await SimulateDelay();
        }

        public async Task MergeOrUploadBatch(RegisterBusinessModel[] entities)
        {
            _simulateDelay = false;

            foreach (var entity in entities)
                await AddOrUpdateEntity(entity, false);
        }

        public async Task UploadBatch(RegisterBusinessModel[] entities)
        {
            _simulateDelay = false;

            foreach (var entity in entities)
                await AddOrUpdateEntity(entity, true);
        }

        private async Task SimulateDelay()
        {
            await Task.Delay(10);
        }

        public async Task RemoveFromIndex(RegisterBusinessModel[] entityKey)
        {
            foreach (var ent in entityKey)
                Db.Remove(ent.CommonIdentifier);
        }

        public Task UpdateSearchIndexes(bool fieldsAreChanged = false, bool newIndex = false)
        {
            throw new NotImplementedException();
        }

        public string GetConnectionInfo()
        {
            return "This is a mocked connection";
        }

        public Task RemoveFromPropertyList(string searchTerm, string filter, string propertyName, string removeThisValue)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentSearchResult<RegisterBusinessModel>> SearchWithFullResult(string searchKey, string filter, bool count = false, List<string> orderBy = null, int top = 50, int? skip = null, List<string> select = null, string[] searchFields = null)
        {
            var findthis = searchKey.ToLower();
            var ninSearch = string.IsNullOrEmpty(filter) || !filter.Contains("organizationNumber eq") ? null : filter.Split(' ')[2].Substring(1, 11);
            var result = new List<RegisterBusinessModel>();

            foreach (var value in Db.Values)
            {
                if (!string.IsNullOrEmpty(ninSearch) && value.OrganizationNumber == ninSearch)
                    result.Add(value);

                else if (value.Tags != null && value.Tags.Any(t => t == findthis))
                    result.Add(value);
            }

            return Task.FromResult(new DocumentSearchResult<RegisterBusinessModel>()
            {
                Results = result.Select(x => new SearchResult<RegisterBusinessModel>() { Document = x }).ToList(),
                Count = result.Count,

            });
        }

        public async Task CreateNewIndex(string indexName)
        {
            throw new NotImplementedException();
        }
    }
}
