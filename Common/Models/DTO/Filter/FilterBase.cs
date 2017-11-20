using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DbEntities;

namespace TestdataApp.Common.Models.DTO.Filter
{
    public abstract class FilterBase 
    {
        protected List<FilterGroup> _filters;
        public Dictionary<string, FilterItem> _flatReferenceDic;

        public IEnumerable<FilterGroup> GetFilters() => _filters;

        public async Task Init()
        {
            _flatReferenceDic = new Dictionary<string, FilterItem>();
            await SetFilters();
        }

        public void Init(List<FilterGroup> filters)
        {
            _filters = filters;

            var flatList = new List<FilterItem>();
            Flatten(_filters, flatList);
            _flatReferenceDic = flatList.ToDictionary(item => item.UniqueValue, item => item);
        }

        public static void SetSelectedFilters(List<FilterGroup> all, IEnumerable<FilterItem> selected)
        {
            var dic = selected.ToDictionary(s => s.UniqueValue, t => t);
            SetSelectedFilters(all, dic);
        }

        private static void SetSelectedFilters(List<FilterGroup> all, Dictionary<string, FilterItem> setThese)
        {
            foreach (var item in all)
            {
                if (item.Groups != null && item.Groups.Any())
                    SetSelectedFilters(item.Groups, setThese);

                foreach (var selectedItem in item.Items.Where(i => setThese.ContainsKey(i.UniqueValue)))
                {
                    selectedItem.Selected = true;
                    selectedItem.Parameter = setThese[selectedItem.UniqueValue].Parameter;
                }
            }
        }

        public IEnumerable<FilterItem> GetSelectedFilters()
        {
            var s =  _flatReferenceDic.Values.Where(item => item.Selected);
            return s;
        }

        private static void Flatten(IEnumerable<FilterGroup> all, List<FilterItem> result)
        {
            foreach (var item in all)
            {
                if (item.Groups != null && item.Groups.Any())
                    Flatten(item.Groups, result);

                if (item.Items != null)
                    result.AddRange(item.Items);
            }
        }

        public abstract Task SetFilters();


        protected void SortValuesToStartOfList(FilterGroup group, params string[] values)
        {
            foreach (var value in values.Reverse())
            {
                var item = group.Items.FirstOrDefault(x => x.Value == value);
                group.Items.Remove(item);
                if (item == null) continue;

                group.Items.Insert(0, item);
            }
        }


        public static string GetListFilterString(string property, string codeValue)
        {
            return $"{property}/any(f: f eq '{codeValue}')";
        }

        public static string GetListFilterStringWithOr(string property, string[] codeValues)
        {
            var complete = "";
            for (int i = 0; i < codeValues.Length - 1; i++)
            {
                var inner = "f eq '" + codeValues[i] + "'";
                complete += $"{property}/any(f: {inner}) or ";
            }

            complete += $"{property}/any(f: f eq '{codeValues[codeValues.Length - 1]}')";

            return "(" + complete + ")";
        }

        public static string GetUniqueValue(string name, string value)
        {
            return name + value;
        }

        protected async Task<FilterGroup> GetTags(IJsonStorage<Tag> tagDb, int belongsToId, string tagGroupName = "Tags")
        {
            var tags = new FilterGroup
            {
                Name = tagGroupName,
                BelongsTo = belongsToId,
                IsCustome = true,
                Type = FilterDisplayTypes.Tag
            };

            bool any = false;
            foreach (var tag in await tagDb.Get(Tag.PartitionKey))
            {
                any = true;

                var fi = new FilterItem(tag.Name, tag.Key, FilterType.Bool, tagGroupName);
                fi.DisplayName = "Tag: " + tag.Name;
                fi.FilterString = GetListFilterString("tags", tag.Key); 

                tags.Items.Add(fi);
            }

            if (!any)
                return null;

            foreach (var item in tags.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return tags;
        }
    }
}