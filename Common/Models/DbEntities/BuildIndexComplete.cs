using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Shared.Common.Storage;

namespace TestdataApp.Common.Models.DbEntities
{
    public class BuildIndexComplete : IJsonStorageEntity
    {
        public string Register { get; set; }
        public double ElapsedMinutes { get; set; }
        public int NumberOfEntities { get; set; }
        public string Salt { get; set; }
        public DateTime? When { get; set; }
        public string Environment { get; set; }

        public static async Task<bool> Complete(string registerName, Stopwatch stopwatch, int numberOfUploads, IJsonStorage<BuildIndexComplete> db, string environment)
        {
            var entity = new BuildIndexComplete
            {
                Register = registerName,
                ElapsedMinutes = stopwatch.Elapsed.TotalMinutes,
                NumberOfEntities = numberOfUploads,
                Salt = Guid.NewGuid().ToString(),
                When = DateTime.UtcNow,
                Environment = environment
            };

            await db.Post(entity);
            return true;
        }

        public string GetPartitionKey()
        {
            return Register;
        }

        public string GetRowKey()
        {
            return Salt;
        }
    }
}