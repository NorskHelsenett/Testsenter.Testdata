using System.Collections.Generic;

namespace TestdataApp.Common.Models.DTO.Filter
{
    public class FilterGroup
    {
        public FilterGroup()
        {
            Groups = new List<FilterGroup>();
            Items = new List<FilterItem>();
        }

        public List<FilterGroup> Groups { get; set; }
        public List<FilterItem> Items { get; set; }
        public string Name { get; set; }
        public int BelongsTo { get; set; }
        public string Type { get; set; } = FilterDisplayTypes.Checkbox;
        public int NumberToShow { get; set; } = 3;
        public bool IsCustome { get; set; }
    }
}