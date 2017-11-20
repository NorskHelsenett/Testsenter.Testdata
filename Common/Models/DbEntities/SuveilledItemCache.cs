using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Shared.Common.Azure.TableStorage;
using Shared.Common.Logic;
using Shared.Common.Storage;

namespace TestdataApp.Common.Models.DbEntities
{
    public class SuveilledItemCache : ITableStorageDb<SurveilledItem>
    {
        private readonly Dictionary<string, SimpleCache> _simpleCache;

        private readonly TableStorageDbMock<SurveilledItem> _cache;
        private readonly ITableStorageDb<SurveilledItem> _realDb;
        private static readonly object CacheUpateLock = new object();
        private bool _isLocked;

        public SuveilledItemCache(ITableStorageDb<SurveilledItem> realDb)
        {
            _cache = new TableStorageDbMock<SurveilledItem>();
            _realDb = realDb;
            _isLocked = false;
            _simpleCache = new Dictionary<string, SimpleCache>();
        }

        private void AssertCacheIsReady(string partitionKey)
        {
            if (!_simpleCache.ContainsKey(partitionKey))
            {
                UpdateCache(partitionKey, true);
                return;
            }

            if(_simpleCache[partitionKey].TimeOut())
                UpdateCache(partitionKey, false);
        }

        private void UpdateCache(string partitionKey, bool newUpSimpleCache)
        {
            lock (CacheUpateLock)
            {
                if(newUpSimpleCache && !_simpleCache.ContainsKey(partitionKey))
                    _simpleCache.Add(partitionKey, new SimpleCache(120));

                _isLocked = true;
                _cache.Insert(_realDb.Get(partitionKey), false, true);
                _isLocked = false;
            }
        }

        public IEnumerable<SurveilledItem> Get(string partionkey)
        {
            AssertCacheIsReady(partionkey);
            return _cache.Get(partionkey);
        }

        public IEnumerable<SurveilledItem> Take(string partionkey, int take)
        {
            AssertCacheIsReady(partionkey);
            return _cache.Take(partionkey, take);
        }

        public IEnumerable<SurveilledItem> Query(string partionkey, string propertyName, string @equals, int? take = null)
        {
            AssertCacheIsReady(partionkey);
            return _cache.Query(partionkey, propertyName, @equals, take);
        }

        public SurveilledItem Get(SurveilledItem item, bool throwException = false)
        {
            AssertCacheIsReady(item.GetPartitionKey());
            return _cache.Get(item, throwException);
        }

        public SurveilledItem Get(string partionkey, string rowKey, bool throwException = false)
        {
            AssertCacheIsReady(partionkey);
            return _cache.Get(partionkey, rowKey, throwException);
        }

        public async Task<SurveilledItem> GetAsync(string partionkey, string rowKey, bool throwException = false)
        {
            AssertCacheIsReady(partionkey);
            await WaitForUnlockedState();
            return await _cache.GetAsync(partionkey, rowKey, throwException);
        }

        public async Task<IEnumerable<SurveilledItem>> Query(string partionkey, string propertyName, int @equals, int? take = null)
        {
            AssertCacheIsReady(partionkey);
            await WaitForUnlockedState();
            return await _cache.Query(partionkey, propertyName, @equals, take);
        }

        private async Task<bool> WaitForUnlockedState()
        {
            while (_isLocked)
                await Task.Delay(100);

            return true;
        }

        private void InsertAndResetCache(SurveilledItem newItem)
        {
            lock (CacheUpateLock)
            {
                _isLocked = true;
                _cache.Insert(newItem, false, true);
                _isLocked = false;
            }
        }

        private void InsertAndResetCache(IEnumerable<SurveilledItem> newItems)
        {
            lock (CacheUpateLock)
            {
                _isLocked = true;
                _cache.Insert(newItems, false, true);
                _isLocked = false;
            }
        }

        private void DeleteAndResetCache(IEnumerable<SurveilledItem> newItems)
        {
            lock (CacheUpateLock)
            {
                _isLocked = true;
                _cache.DeleteMany(newItems);
                _isLocked = false;
            }
        }

        public TableResult Insert(SurveilledItem item, bool throwExceptionOnInvalidItems, bool replace = false)
        {
            var result = _realDb.Insert(item, throwExceptionOnInvalidItems, replace);
            InsertAndResetCache(item);
            return result;
        }

        public async Task<TableResult> InsertAsync(SurveilledItem item, bool throwExceptionOnInvalidItems, bool replace = false)
        {
            var result = await _realDb.InsertAsync(item, throwExceptionOnInvalidItems, replace);
            InsertAndResetCache(item);
            return result;
        }

        public IEnumerable<SurveilledItem> Insert(IEnumerable<SurveilledItem> items, bool throwExceptionOnInvalidItems, bool replace = false)
        {
            var asList = items.ToList();
            var result = _realDb.Insert(asList, throwExceptionOnInvalidItems, replace);
            InsertAndResetCache(asList);

            return result;
        }

        public void DeleteMany(IEnumerable<SurveilledItem> items)
        {
            var asList = items.ToList();
            _realDb.DeleteMany(asList);
            DeleteAndResetCache(asList);
        }

        public IEnumerable<SurveilledItem> QuerySegmented(string partitionKey, ref TableQuery<SurveilledItem> query, ref TableContinuationToken continuationToken)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TCustom> GetCustomType<TCustom>(string partionkey) where TCustom : TableEntity, new()
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _realDb.Dispose();
            _cache.Dispose();
        }
    }
}