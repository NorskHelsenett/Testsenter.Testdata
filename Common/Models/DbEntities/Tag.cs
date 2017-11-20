using Shared.Common.Storage;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class Tag : IJsonStorageEntity
    {
        public static string PartitionKey = "alltags";

        public string Name { get; set; }
        public string Key { get; set; }
        public string RegisteredBy { get; set; }
        public int TeamProjectInt { get; set; }

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
            return PartitionKey;
        }

        public string GetRowKey()
        {
            return Key;
        }

        public bool IsLegal()
        {
            return
                !string.IsNullOrEmpty(RegisteredBy)
                &&
                !string.IsNullOrEmpty(Name)
                &&
                Name.Length < 50;
        }
    }
}