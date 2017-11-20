using System;
using System.Collections.Generic;
using System.Text;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.Common.Models.DbEntities
{
    public class SearchQueryHelper
    {
        public static string PartitionKey = "savedSearches";

        public static string GetHash(string name)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(name);
            return Convert.ToBase64String(plainTextBytes);
        }
    }

    public class SearchQuery : IJsonStorageEntity 
    {
        public string FriendlyName { get; set; }
        public string DbName { get; set; }
        public string Description { get; set; }
        public string SearchTerm { get; set; }
        public string RegisteredBy { get; set; }
        public int TeamProjectInt { get; set; }
        public List<FilterItem> SelectedFilters { get; set; }
        public List<FilterGroup> Filters { get; set; }
        public IndexTypeName SearchIndex { get; set; }
        public string RegisteredByFriendlyName { get; set; }

        public Team GetProject(ITeamProvider tp)
        {
            return tp.GetTeam(TeamProjectInt);
        }

        public void SetProject(Team t)
        {
            TeamProjectInt = t.Id;
        }

        public void CheckValid()
        {
            if (string.IsNullOrEmpty(FriendlyName))
                throw new ArgumentException("Name cannot be null");

            if (Filters == null)
                throw new ArgumentException("Filters cannot be null");
        }

        public string GetPartitionKey()
        {
           return SearchQueryHelper.PartitionKey;
        }

        public string GetRowKey()
        {
            if (string.IsNullOrEmpty(DbName))
                throw new ArgumentException("Name cannot be null");

            return SearchQueryHelper.GetHash(DbName);
        }
    }
}