using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Azure.Search.Models;

namespace TestdataApp.Common.Search
{
    public interface IAzureSearch<TEntityType>
        where TEntityType : class, IIndexEntity
    {
        Task<TEntityType> GetByKey(string key, bool throwExceptionIfNotFound = false);
        Task<IEnumerable<TEntityType>> Search(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null);
        Task<DocumentSearchResult<TEntityType>> SearchWithFullResult(string searchKey, string filter, bool count = false, string[] orderBy = null, int top = 50, int? skip = null, string[] select = null, string[] searchFields = null);
        Task<IEnumerable<TEntityType>> GetCompleteSet(string searchKey, string filter, string[] select = null, int takeCount = 1000);
        Task MergeOrUploadBatch(TEntityType[] entities);
        Task UploadBatch(TEntityType[] entities);
        Task AddOrUpdateEntity(TEntityType entity, bool removeOldValues = false);
        Task AddToPropertyList(string entityKey, string propertyName, string appendThisValue);
        Task RemoveFromPropertyList(string entityKey, string propertyName, string removeThisValue);
        Task RemoveFromPropertyList(string searchTerm, string filter, string propertyName, string removeThisValue);
        Task RemoveFromIndex(TEntityType[] entityKey);
        Task UpdateSearchIndexes(bool fieldsAreChanged = false, bool newIndex = false);
        string GetConnectionInfo();
    }
}
