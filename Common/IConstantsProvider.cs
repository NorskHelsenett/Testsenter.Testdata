namespace TestdataApp.Common
{
    public interface IConstantsProvider
    {
        #region Storage

        StorageInfo Table_SurveillanceItem();
        StorageInfo Table_BuildIndexComplete();
        StorageInfo Table_SurveillanceResult();
        StorageInfo Table_LatestSurveillanceResult();
        StorageInfo Table_Tag();
        StorageInfo Table_RegisterPersonModel(); //<- her må vi gjøre noe custom .. IIndexEntity
        StorageInfo Table_SearchQuery();
        StorageInfo Table_Comment();


        StorageInfo Queue_Surveillance();
        StorageInfo Queue_BuildIndex();

        #endregion

        #region SearchIndex

        bool SearchIndex_UseSingleton(); //recommended true for webapp, false for webjob
        string GetSearchApiKey(); //from azure search index
        string GetSearchIndexName(); //from azure search index

       
        #endregion

        #region Surveillance
        string TriggerAllSurveillancesSchedulerName();

        //alle navn (partitionkeys) som skriver til BuildIndexComplete
        //mao, alle navn på jobber som går for å bygge opp indexen(e)
        string[] AllRegisternamesForBuildingIndexes();

        #endregion
    }

    public class StorageInfo
    {
        public string StorageAccountKey { get; set; }
        public string Name { get; set; } //Tablename, queuename, blobstore
    }
}
