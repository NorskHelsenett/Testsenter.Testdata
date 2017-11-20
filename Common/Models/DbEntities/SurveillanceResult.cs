using System;
using Shared.Common.Storage;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class SurveillanceResult : IJsonStorageEntity
    {
        public bool Success { get; set; }
        public DateTime CheckedAt { get; set; }
        public string ErrorText { get; set; }
        public string Id { get; set; }
        public string ActionKey { get; set; }
        public string ActionInstanceIdentifier { get; set; }
        //Brukes
        public string CommonIdentifier { get; set; }
       
        public int TeamProjectInt { get; set; }
        public string RegisteredBy { get; set; }
        public string ContentAsJson { get; set; }
        public int RegisterEnvironmentInt { get; set; }

        public SurveillanceResult() { }

        public SurveillanceResult(string id, SurveilledItem item, string newContent, bool success, string errorText = null)
        {
            Id = id;
            ContentAsJson = newContent;
            Success = success;
            ErrorText = errorText;
            SetProject(item.TeamProjectInt);

            ActionInstanceIdentifier = item.ActionInstanceIdentifier;
            ActionKey = item.ActionKey;
            RegisteredBy = item.RegisteredByFriendlyName;
            CheckedAt = DateTime.Now;
        }

        public Team GetProject(ITeamProvider tp)
        {
            return tp.GetTeam(TeamProjectInt);
        }

        public void SetProject(Team t)
        {
            SetProject(t.Id);
        }

        private void SetProject(int tId)
        {
            TeamProjectInt = tId;
        }

        public virtual string GetRowKey()
        {
            if (string.IsNullOrEmpty(Id))
                Id = Guid.NewGuid().ToString();

            return Id;
        }

        public virtual string GetPartitionKey()
        {
            return GetPartitionKey(this);
        }

        public static string GetPartitionKey(SurveillanceResult s)
        {
            return GetPartitionKey(s.ActionKey, s.ActionInstanceIdentifier, s.TeamProjectInt);
        }

        private static string GetPartitionKey(string actionKey, string actionInstanceIdentifier, int team)
        {
            return actionKey + "_" + actionInstanceIdentifier + "_" + team.ToString();
        }

        
    }
}