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
    public class MockPersonAzureSearch : IAzureSearch<RegisterPersonModel>
    {
        public Dictionary<string, RegisterPersonModel> Db { get; set; }
        private bool _simulateDelay = true;

        public MockPersonAzureSearch()
        {
            Db = new Dictionary<string, RegisterPersonModel>();
        }

        public Task<RegisterPersonModel> GetByKey(string key, bool throwExceptionIfNotFound = false)
        {
            var exists = Db.ContainsKey(key);

            if (!exists)
            {
                if(throwExceptionIfNotFound)
                    throw new ArgumentException();
                return Task.FromResult<RegisterPersonModel>(null); 
            }

            return !Db.ContainsKey(key) ? Task.FromResult<RegisterPersonModel>(null) : Task.FromResult(Db[key]);
        }

        public Task<IEnumerable<RegisterPersonModel>> Search(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null)
        {
            var findthis = searchKey.ToLower();
            var ninSearch = string.IsNullOrEmpty(filter) || !filter.Contains("nin eq") ? null : filter.Split(' ')[2].Substring(1, 11);
            var result = new List<RegisterPersonModel>();

            foreach (var value in Db.Values)
            {
                var val = value as RegisterPersonModel;
                if (!string.IsNullOrEmpty(ninSearch) && val?.Nin == ninSearch)
                    result.Add(value);

                else if (val.Tags != null && val.Tags.Any(t => t == findthis))
                    result.Add(value);
            }

            return Task.FromResult(result.AsEnumerable());
        }

        public Task<IEnumerable<RegisterPersonModel>> GetCompleteSet(string searchKey, string filter, string[] select = null, int takeCount = 1000)
        {
            return Search(searchKey, filter, @select:select, top: takeCount);
        }

        public async Task AddToPropertyList(string entityKey, string propertyName, string appendThisValue)
        {
            var entity = Db.Values.SingleOrDefault(x => x.CommonIdentifier == entityKey);
            if(entity == null)
                throw new Exception("Fant ikke objekt med nøkkel " + entityKey);

            PropertyInfo pi = entity.GetType().GetProperty(propertyName);

            var arr = (string[]) pi.GetValue(entity, null);
            if (arr == null)
                arr = new[] {appendThisValue};

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

        public async Task AddOrUpdateEntity(RegisterPersonModel entity, bool removeOldValues = false)
        {
            if (!Db.ContainsKey(entity.CommonIdentifier))
                Db.Add(entity.CommonIdentifier, entity);
            else
            {
                var tmp = RegisterPersonLogic.Merge(Db[entity.CommonIdentifier], entity, true);
                Db[entity.CommonIdentifier] = tmp;
            }

            if(_simulateDelay)
                await SimulateDelay();
        }

        public async Task MergeOrUploadBatch(RegisterPersonModel[] entities)
        {
            _simulateDelay = false;

            foreach (var entity in entities)
                await AddOrUpdateEntity(entity, false);
        }

        public async Task UploadBatch(RegisterPersonModel[] entities)
        {
            _simulateDelay = false;

            foreach (var entity in entities)
                await AddOrUpdateEntity(entity, true);
        }

        private async Task SimulateDelay()
        {
            await Task.Delay(10);
        }

        public async Task RemoveFromIndex(RegisterPersonModel[] entityKey)
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

        public Task<DocumentSearchResult<RegisterPersonModel>> SearchWithFullResult(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null)
        {
            var result = Db.Values.Take(50).ToList();

            return Task.FromResult(new DocumentSearchResult<RegisterPersonModel>()
            {
                Results = result.Select(x => new SearchResult<RegisterPersonModel>() { Document = x }).ToList(),
                Count = result.Count,

            });
        }

        public async Task CreateNewIndex(string indexName)
        {
            throw new NotImplementedException();
        }
    }
}
