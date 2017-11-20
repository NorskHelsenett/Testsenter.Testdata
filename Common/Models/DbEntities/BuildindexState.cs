using Shared.Common.Storage;

namespace TestdataApp.Common.Models.DbEntities
{
    public class BuildindexState : IJsonStorageEntity
    {
        public string SessionId { get; set; }
        public string Filename { get; set; }
        public int NumberOfUploads { get; set; }

        public string GetPartitionKey()
        {
            return Filename;
        }

        public string GetRowKey()
        {
            return SessionId;
        }
    }
}