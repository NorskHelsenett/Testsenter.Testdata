using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;
using Newtonsoft.Json;
using Shared.Common.Storage;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class SurveilledItem : TableEntity
    {
        public SurveilledItem(string actionKey, string actionInstanceIdentifier, Team teamProject)
        {
            ActionKey = actionKey;
            _actionInstanceIdentifier = actionInstanceIdentifier;
            SetProject(teamProject);

            RowKey = GetRowKey(teamProject, _actionInstanceIdentifier);
            PartitionKey = GetPartitionKey(ActionKey);
        }

        public SurveilledItem() { }

        public DateTime ClaimedWhen { get; set; }
        public string ActionKey { get; set; }
        [JsonIgnore]
        public const string ActionInstanceIdentifierFieldName = "ActionInstanceIdentifier";

        private string _actionInstanceIdentifier;
        public string ActionInstanceIdentifier
        {
            get
            {
                return _actionInstanceIdentifier;
            }
            set
            {
                _actionInstanceIdentifier = value;
            }
        }

        [JsonIgnore]
        public const string TeamNameFieldName = "TeamName";

        public Team GetProject(ITeamProvider tp)
        {
            return tp.GetTeam(TeamProjectInt);
        }

        public void SetProject(Team t)
        {
            TeamProjectInt = t.Id;
        }
        public int TeamProjectInt { get; set; }
        public string RegisteredByFriendlyName { get; set; }
        public string RegisteredByUsername { get; set; }
        public string ContentAsJson { get; set; }
        public int RegisterEnvironmentInt { get; set; }
        public string CommonIdentifier { get; set; }
   
        public static async Task<IEnumerable<SurveilledItem>> GetAllForActionIdentifier(string actionKey, string actionIdentifier, ITableStorageDb<SurveilledItem> db)
        {
            return await Task.FromResult(db.Query(actionKey, "ActionInstanceIdentifier", actionIdentifier));
        }

        public static async Task<SurveilledItem> Get(string actionKey, string actionIdentifiser, Team team, ITableStorageDb<SurveilledItem> db)
        {
            return await db.GetAsync(SurveilledItem.GetPartitionKey(actionKey), GetRowKey(team, actionIdentifiser), throwException: false);
        }

        public static async Task<IEnumerable<SurveilledItem>> GetAllForteam(string actionKey, Team team, ITableStorageDb<SurveilledItem> db)
        {
            return await db.Query(actionKey, "TeamProjectInt", team.Id);
        }

        public string GetRowKey()
        {
            return GetRowKey(TeamProjectInt, ActionInstanceIdentifier);
        }

        public string GetPartitionKey()
        {
            return GetPartitionKey(this.ActionKey);
        }

        private static string GetRowKey(Team teamname, string actionInstanceIdentifier)
        {
            return GetRowKey(teamname.Id, actionInstanceIdentifier);
        }

        private static string GetRowKey(int teamId, string actionInstanceIdentifier)
        {
            return teamId + "_" + actionInstanceIdentifier;
        }

        private static string GetPartitionKey(string actionKey)
        {
            return actionKey;
        }

        public string Id()
        {
            return PartitionKey + RowKey;
        }

        public Tuple<string, string> GetPartionkeyAndRowkey()
        {
            return new Tuple<string, string>(PartitionKey, RowKey);
        }

        public static void ParsePartitionkeyAndRowkey(object o, out string partitionKey, out string rowKey)
        {
            var tuple = (Tuple < string, string> ) o;
            ParsePartitionkeyAndRowkey(tuple, out partitionKey, out rowKey);
        }

        public static void ParsePartitionkeyAndRowkey(Tuple<string, string> tuple, out string partitionKey, out string rowKey)
        {
            partitionKey = tuple.Item1;
            rowKey = tuple.Item2;
        }
    }
}