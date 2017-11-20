using TestdataApp.Common;

namespace TestdataApp.ExampleProject.Config
{
    public class ExampleConstantsProvider : IConstantsProvider
    {
        private StorageInfo Get(string name)
        {
            var x = new StorageInfo
            {
                Name = name,
                StorageAccountKey = null
            };

            return x;
        }

        public StorageInfo Table_SurveillanceItem() => Get("Table_SurveillanceItem");

        public StorageInfo Table_BuildIndexComplete() => Get("Table_BuildIndexComplete");

        public StorageInfo Table_SurveillanceResult() => Get("Table_SurveillanceResult");

        public StorageInfo Table_LatestSurveillanceResult() => Get("Table_LatestSurveillanceResult");

        public StorageInfo Table_Tag() => Get("Table_Tag");

        public StorageInfo Table_RegisterPersonModel() => Get("Table_RegisterPersonModel");

        public StorageInfo Table_SearchQuery() => Get("Table_SearchQuery");

        public StorageInfo Table_Comment() => Get("Table_Comment");

        public StorageInfo Queue_Surveillance() => Get("Queue_Surveillance");

        public StorageInfo Queue_BuildIndex() => Get("Queue_BuildIndex");

        public bool SearchIndex_UseSingleton()
        {
            return true;
        }

        public string GetSearchApiKey()
        {
            return string.Empty;
        }

        public string GetSearchIndexName()
        {
            return string.Empty;
        }

        public string TriggerAllSurveillancesSchedulerName()
        {
            return string.Empty;
        }

        public string[] AllRegisternamesForBuildingIndexes()
        {
            return new string[] {"Dataprovder1, Dataprovider2"};
        }
    }
}