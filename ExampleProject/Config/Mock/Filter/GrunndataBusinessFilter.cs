using System.Collections.Generic;
using System.Threading.Tasks;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.ExampleProject.Filter;

namespace TestdataApp.ExampleProject.Config.Mock.Filter
{
    public class GrunndataBusinessFilter : FilterBase, IBusinessFilterManager
    {
        protected readonly IJsonStorage<Tag> _tagDb;

        private static readonly string[] naeringskoder = 
        {
            "86.101", "86.102", "86.103", "86.104", "86.105", "86.106", "86.107", "86.211", "86.212", "86.221",
            "86.222", "86.223", "86.224", "86.225", "86.230", "86.901", "86.902", "86.903", "86.904", "86.905",
            "86.906", "86.907", "86.909", "87.101", "87.102", "87.201"
        };

        public GrunndataBusinessFilter(IJsonStorage<Tag> tagDb)
        {
            _tagDb = tagDb;
        }

        public static IEnumerable<FilterGroup> GetFilters(List<FilterGroup> all,
            IEnumerable<FilterItem> selected)
        {
            var bf = new GrunndataBusinessFilter(null);
            bf.Init(all);
            foreach (var selectedFilter in selected)
            {
                if (!bf._flatReferenceDic.ContainsKey(selectedFilter.UniqueValue))
                    continue;
                bf._flatReferenceDic[selectedFilter.UniqueValue].Selected = true;
                bf._flatReferenceDic[selectedFilter.UniqueValue].Parameter = selectedFilter.Parameter;
            }

            return bf.GetFilters();
        }

        public override async Task SetFilters()
        {
            _filters = new List<FilterGroup>()
            {
                Register(),
                HasParentOrg(),
                Tjenester(), 
                ComPartType(),
                ServiceCode(),
            };

            var tags = await GetTags(_tagDb, 3, GrunndataPersonFilterConst.Tags);
            if (tags != null)
                _filters.Add(tags);
        }

        private FilterGroup Tjenester()
        {
            var reg = new FilterGroup
            {
                Name = GrunndataFilterItem._CP,
                BelongsTo = (int) FilterBelonging.AR,
                NumberToShow = 8,
                Type = FilterDisplayTypes.Checkbox
            };
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsValidCp, "1", GrunndataFilterItem._CP, filterString: "isValidCommunicationParty"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInvalidCp, "2", GrunndataFilterItem._CP, filterString: "not isValidCommunicationParty"));

            foreach (var item in reg.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);
            return reg;
        }

        private FilterGroup Register()
        {
            var reg = new FilterGroup
            {
                Name = GrunndataFilterItem._IRegister,
                BelongsTo = (int) FilterBelonging.All,
                NumberToShow = 8,
                Type = FilterDisplayTypes.Checkbox
            };

            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInAr, "1", GrunndataFilterItem._IRegister, filterString: "isInAr", displayName: "Finnes i AR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInAr, "2", GrunndataFilterItem._IRegister, filterString: "not isInAr ", displayName: "Finnes ikke i AR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInBedReg, "3", GrunndataFilterItem._IRegister, filterString: "isInBedReg", displayName: "Finnes i BREG"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInBedReg, "4", GrunndataFilterItem._IRegister, filterString: "not isInBedReg", displayName: "Finnes ikke i BREG"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInFlr, "4", GrunndataFilterItem._IRegister, filterString: "isInFlr", displayName: "Finnes i FLR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInFlr, "4", GrunndataFilterItem._IRegister, filterString: "not isInFlr", displayName: "Finnes ikke i FLR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInHtk, "5", GrunndataFilterItem._IRegister, filterString: "isInHtk", displayName: "Finnes i HTK"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInHtk, "6", GrunndataFilterItem._IRegister, filterString: "not isInHtk", displayName: "Finnes ikke i HTK"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInResh, "7", GrunndataFilterItem._IRegister, filterString: "isInResh", displayName: "Finnes i Resh"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInResh, "8", GrunndataFilterItem._IRegister, filterString: "not isInResh", displayName: "Finnes ikke i Resh"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsInOfr, "9", GrunndataFilterItem._IRegister, filterString: "isInOfr", displayName: "Finnes i OFR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.IsNotInOfr, "10", GrunndataFilterItem._IRegister, filterString: "not isInOfr", displayName: "Finnes ikke i OFR"));
           

            foreach (var item in reg.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);


            return reg;
        }


        private FilterGroup ComPartType()
        {
            var group = new FilterGroup
            {
                Name = GrunndataFilterItem._ComPartType,
                BelongsTo = (int) FilterBelonging.AR,
                NumberToShow = 8,
                Type = FilterDisplayTypes.Checkbox
            };
            group.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.ComPartDepartment, "1", GrunndataFilterItem._ComPartType, filterString: "(communicationPartyType eq 'Department')"));
            group.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.ComPartOrganization, "2", GrunndataFilterItem._ComPartType, filterString: "(communicationPartyType eq 'Organization')"));
            group.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.ComPartPerson, "3", GrunndataFilterItem._ComPartType, filterString: "(communicationPartyType eq 'Person')"));
            group.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataBusinessFilterConst.ComPartService, "4", GrunndataFilterItem._ComPartType, filterString: "(communicationPartyType eq 'Service')"));

            group.Items.ForEach(item => _flatReferenceDic.Add(item.UniqueValue, item));

            return group;

        }

        private FilterGroup HasParentOrg()
        {
            var group = new FilterGroup
            {
                BelongsTo = (int) FilterBelonging.BedReg,
                Name = GrunndataFilterItem._Parent,
                Type = FilterDisplayTypes.Checkbox
            };

            AddFilerItem(group.Items, GrunndataFilterItem.GetFilterItem("Har foreldreenhet", "1", GrunndataFilterItem._Parent, FilterType.Bool, filterString: "(parentOrgNr ne null)"));
            AddFilerItem(group.Items, GrunndataFilterItem.GetFilterItem("Har ikke foreldreenhet", "2", GrunndataFilterItem._Parent, FilterType.Bool, filterString: "(parentOrgNr eq null)"));
            return group;
        }

    
        private FilterGroup ServiceCode()
        {
            var group = new FilterGroup()
            {
                BelongsTo = (int) FilterBelonging.AR,
                Items = new List<FilterItem>() { GrunndataFilterItem.GetFilterItem("Kode", "1", "Tjenestekode", FilterType.String, displayType: FilterDisplayTypes.Freetext, filterString: "serviceCode eq ",displayName:"Tjenestekode") },
                Name = "Tjenestekode",
                Type = FilterDisplayTypes.Freetext
            };
            group.Items.ForEach(f => _flatReferenceDic.Add(f.UniqueValue, f));
            return group;
        }

        private void AddFilerItem(List<FilterItem> items, FilterItem filterItem)
        {
            items.Add(filterItem);
            _flatReferenceDic.Add(filterItem.UniqueValue, filterItem);
        }
    }
}