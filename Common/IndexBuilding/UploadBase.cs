using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using log4net;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.IndexBuilding
{
    public abstract class UploadBase<T> where T : class, IIndexEntity
    {
        public bool Quit { get; set; }

        public abstract IAzureSearch<T> GetAzureSearch();

        public async Task<IEnumerable<T>> GetColumnValuesFromIndex(List<T> items, List<string> searchFields, Func<T, string> selector, string retriveField, Action<T, T> setter) 
        {
            if (!items.Any())
                return items;
            var ids = items.Select(selector).Where(p => p != null).ToList();
            while (ids.Any())
            {
                var searchTerms = string.Join("|", ids.Take(500));
                var searchResult = await GetAzureSearch().Search(searchTerms, null, true, top: 1000, searchFields: searchFields.ToArray(), @select: searchFields.Concat(new[] { retriveField }).ToArray());
                if (searchResult.Any())
                {
                    searchResult.ToList().ForEach(item => setter(items.FirstOrDefault(res => selector(item) == selector(res)), item));
                }

                ids.RemoveRange(0, ids.Count > 500 ? 500 : ids.Count);
            }

            return items;
        }

        public async Task<int> TryPushMoreThan1000(List<T> thisSet, IAzureSearch<T> myClient, ILog log, CancellationToken cancellationToken, bool removeOldValues = false) 
        {
            int numberToTakeEachTime = 1000;
            int currentIndex = 0;
            bool thisIsTheEnd = false;

            while (!thisIsTheEnd && !cancellationToken.IsCancellationRequested)
            {
                thisIsTheEnd = thisSet.Count < currentIndex + numberToTakeEachTime;

                var batch = thisIsTheEnd ? thisSet.Skip(currentIndex).ToArray() : thisSet.Skip(currentIndex).Take(numberToTakeEachTime).ToArray();
                if (!batch.Any())
                    break;

                currentIndex += batch.Length;

                if (!await TryPush1000(batch, myClient, log, removeOldValues))
                {
                    log.Error("Failed to upload, could only upload " + currentIndex + "number of items");
                    return 0;
                }

            }

            return currentIndex;
        }

        public async Task<bool> TryPush1000(T[] thisSet, IAzureSearch<T> myClient, ILog log, bool removeOldValues = false)
        {
            bool uploaded = false;
            int retries = 10;
            while (!uploaded)
            {
                var st = Stopwatch.StartNew();
                retries--;
                try
                {
                    await (removeOldValues ? myClient.UploadBatch(thisSet) : myClient.MergeOrUploadBatch(thisSet));
                    await Task.Delay(200);
                    uploaded = true;
                }
                catch (Exception e)
                {
                    st.Stop();
                    var str = $"While uploading, got exception after {st.Elapsed.Minutes} minutes: {e.Message} Stack {e.StackTrace}";
                    if (e.InnerException != null)
                        str += ". InnerException.message=" + e.InnerException.Message + ", InnerException.StackTrace=" + e.InnerException.StackTrace;
                    log?.Error(str);
                    if (retries == 0)
                    {
                        log.Error("Exiting after 10 tries");
                        Quit = true;
                        return false;
                    }

                    log?.Info("Retrying");
                    myClient = GetAzureSearch();

                    await Task.Delay(3000);
                }
            }

            return true;
        }
    }
}