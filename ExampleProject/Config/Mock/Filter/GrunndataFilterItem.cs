using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.ExampleProject.Config.Mock;

namespace TestdataApp.ExampleProject.Filter
{
    public static class GrunndataFilterItem 
    {
        public const string _Tags = "Tags";
        public const string _Kjonn = "Kjonn";
        public const string _IRegister = "Registertilhørighet";
        public const string _IkkeIRegister = "Finnes ikke i register";
        public const string _Alder = "Alder";
        public const string _Familie = "Familie";
        public const string _RegStatus = "Registreringskode";
        public const string _Sivilstand = "Sivilstand";
        public const string _Ektefelle = "Ektefelle";
        public const string _Id = "Identifikator";
        public const string _AdresseKode = "Adressekode";
        public const string _Barn = "Barn";
        public const string _Difi = "Difi";
        public const string _CP = "Kommunikasjonspart";
        public const string _Adr = "Adresser";
        public const string _AdrAndServ = "Adresser og tjenester";
        public const string _EAdr = "Elektoriniske adresser";
        public const string _ParentTypeAR = "Foreldreenhettype";
        public const string _Parent = "Foreldreenhet";
        public const string _ComPartType = "Kommunikasjonsparttype";
        public const string _BusinessType = "Virksomhetstype";
        public const string _IndustryCode = "Næringskode";

        public static FilterItem GetFilterItem(string name, string value, string parent, FilterType type = FilterType.Bool, bool active = true,
            bool selected = false, FilterBelonging belongsTo = FilterBelonging.All, string parameter = "",
            string filterString = "", string displayName = "", string displayType = FilterDisplayTypes.Checkbox, string tagName="")
        {
            var fi = new FilterItem(name, value, type, parent, selected, parameter, filterString);

            fi.DisplayName = string.IsNullOrWhiteSpace(displayName) ? name : displayName;
            fi.TagName = string.IsNullOrWhiteSpace(tagName) ? fi.DisplayName : tagName;
            fi.BelongsToId = (int) belongsTo;

            return fi;
        }
    }
}