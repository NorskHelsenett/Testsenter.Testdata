using System;
using Shared.Common.Storage;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class Comment : IJsonStorageEntity
    {
        public string Key { get; set; }
        public string RegisteredBy { get; set; }
        public string RegisteredByFriendlyName { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TeamProjectInt { get; set; }
        public string CommonIdentifier { get; set; }

        public Team GetProject(ITeamProvider tp)
        {
            return tp.GetTeam(TeamProjectInt);
        }

        public void SetProject(Team t)
        {
            TeamProjectInt = t.Id;
        }

        public string GetPartitionKey()
        {
            return CommonIdentifier;
        }

        public string GetRowKey()
        {
            return Key;
        }

        public void IsLegal()
        {
           if(string.IsNullOrEmpty(CommonIdentifier))
                throw new ArgumentException("CommonIdentifier cannot be null");
            if(string.IsNullOrEmpty(Content))
                throw new ArgumentException("Content can not be empty");
        }

    }
}