using System.Collections;
using System.Linq;

namespace TestdataApp.Common.Models.DTO.Filter
{
    public enum FilterType
    {
        Bool, Int, String, Array, DateTimeOffset, Default
    }
    public class FilterItem : IEqualityComparer
    {

        public string Name { get; set; }
        public string Value { get; set; }
        public string UniqueValue => Name + Value; 
        public string Parent { get; set; }
        public bool Selected { get; set; }
        public FilterType Type { get; set; }
        public string Parameter { get; set; }
        public string FilterString { get; set; }
        public int BelongsToId { get; set; }
        public string DisplayName { get; set; }
        public string TagName { get; set; }


        public FilterItem()
        {
            
        }

        public FilterItem(string name, string value, FilterType type = FilterType.Bool, string parent ="", bool selected = false, string parameter = "", string filterString = "")
        {
            Name = name;
            Value = value;
            Selected = selected;
            Parent = parent;
            Parameter = parameter;
            FilterString = filterString;
            Type = type;
        }

        protected static string[] CreateOrAddToList(string value, string[] list)
        {
            if (list == null)
                return new[] { value };

            var asList = list.ToList();
            asList.Add(value);

            return asList.ToArray();
        }

        public new bool Equals(object x, object y)
        {
            var fi1 = x as FilterItem;
            var fi2 = y as FilterItem;

            if (fi1 == null || fi2 == null)
                return false;

            return fi1.UniqueValue == fi2.UniqueValue;
        }

        public int GetHashCode(object obj)
        {
            var fi = obj as FilterItem;
            if (fi == null)
                return 0;

            return GetHashCode(fi.Value);
        }
    }
}