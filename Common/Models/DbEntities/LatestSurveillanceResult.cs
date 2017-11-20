using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Shared.Common.Storage;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class LatestSurveillanceResult : SurveillanceResult, IJsonStorageEntity
    {
        [JsonIgnore]
        public bool Taken { get; set; }
        public override string GetPartitionKey()
        {
            return TeamProjectInt.ToString();
        }

        public override string GetRowKey()
        {
            return GetRowKey(ActionKey, ActionInstanceIdentifier);
        }

        public static string GetRowKey(string actionKey, string actionIdentifier)
        {
            return actionKey + "_" + actionIdentifier;
        }

        public static string GetPartitionKey(Team team)
        {
            return team.Id.ToString();
        }

        public static async Task<LatestSurveillanceResult> GetLatestSurveillanceResult(string actionKey, string actionInstanceIdentifier, Team team, IJsonStorage<LatestSurveillanceResult> db)
        {
            return await db.Get(GetPartitionKey(team), GetRowKey(actionKey, actionInstanceIdentifier), false);
        }

        public static async Task<IEnumerable<LatestSurveillanceResult>> GetLatestSurveillanceResult(Team team, IJsonStorage<LatestSurveillanceResult> db)
        {
            return await db.Get(GetPartitionKey(team));
        }
    }
}