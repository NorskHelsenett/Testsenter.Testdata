using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Common.Storage;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.ExampleProject.Config.Mock;

namespace TestdataApp.ExampleProject.Filter
{
    public class GrunndataPersonFilter : FilterBase, IPersonFilterManager
    {
        protected readonly IJsonStorage<Tag> _tagDb;

        public new List<FilterGroup> GetFilters() =>  _filters;
        public GrunndataPersonFilter( IJsonStorage<Tag> tagDb)
        {
            _tagDb = tagDb;
        }

        public override async Task SetFilters()
        {
            _filters = new List<FilterGroup>
            {
                Kjonn(),
                Alder(),
                RegStatus(),
                Ektefelle(),
                PregIdentity(),
                AdresseKode(),
                Godkjenning(),
                Fastlege(),
                Register(),
                Barn(),
                Foreldre(),
            };


            var tags = await GetTags(_tagDb, 3, GrunndataPersonFilterConst.Tags);
            if (tags != null)
                _filters.Add(tags);
        }

        #region Fastlege


        private FilterGroup Fastlege()
        {
            var fastlegecategory = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.FastlegeName,
                BelongsTo = (int) FilterBelonging.Flr
            };

            fastlegecategory.Groups.Add(FastlegeWork());
            fastlegecategory.Groups.Add(FastlegePatient());

            return fastlegecategory;
        }

        private FilterGroup FastlegePatient()
        {
            var work = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.FastlegePatientRoot,
                BelongsTo = (int) FilterBelonging.Flr
            };

            var fastlegeProperty = "harfastlegemedstillinger";
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegePatient_WithFastlege, "Fastlege", GrunndataPersonFilterConst.FastlegePatientRoot, filterString: $"{fastlegeProperty}/any(f: f eq '{RegisterPersonLogic.NormalFastlegeKey}')"));
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegePatient_WithVikar, "Vikar", GrunndataPersonFilterConst.FastlegePatientRoot, filterString: $"{fastlegeProperty}/any(f: f eq '{RegisterPersonLogic.VikarKey}')"));
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegePatient_Delelege, "Delelistelege", GrunndataPersonFilterConst.FastlegePatientRoot, filterString: $"{fastlegeProperty}/any(f: f eq '{RegisterPersonLogic.DeleLegeKey}')"));
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegePatient_Legelos, "Legeløs", GrunndataPersonFilterConst.FastlegePatientRoot, filterString: $"{fastlegeProperty}/any(f: f eq '{RegisterPersonLogic.NoDoctorKey}')"));

            foreach (var item in work.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return work;
        }

        private FilterGroup FastlegeWork()
        {
            var rootName = GrunndataPersonFilterConst.FastlegeWorkRoot;
            var work = new FilterGroup
            {
                Name = rootName,
                BelongsTo = (int) FilterBelonging.Flr
            };


            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegeDoctor_Fastlege, GrunndataPersonFilterConst.FastlegeDoctor_Fastlege, rootName, filterString: GetListFilterString("fastlegestillinger", RegisterPersonLogic.NormalFastlegeKey)));
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegeDoctor_Vikar, GrunndataPersonFilterConst.FastlegeDoctor_Vikar, rootName, filterString: GetListFilterString("fastlegestillinger", RegisterPersonLogic.VikarKey)));
            work.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.FastlegeDoctor_Delelege, GrunndataPersonFilterConst.FastlegeDoctor_Delelege, rootName, filterString: GetListFilterString("fastlegestillinger", RegisterPersonLogic.DeleLegeKey)));
            
            foreach (var item in work.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return work;
        }
        #endregion
        
        #region Kjonn
        private FilterGroup Kjonn()
        {
            var kjonn = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.KjonnName,
                BelongsTo = (int) FilterBelonging.Preg
            };


            kjonn.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.KjonnKvinne, "2",GrunndataPersonFilterConst.KjonnName, filterString: "(kjonn eq 2)"));
            kjonn.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.KjonnMann, "3",GrunndataPersonFilterConst.KjonnName, filterString: "(kjonn eq 3)"));

            foreach (var item in kjonn.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return kjonn;
        }


        #endregion

        #region Register

        private FilterGroup Register()
        {
            var reg = new FilterGroup
            {
                Name = GrunndataFilterItem._IRegister,
                BelongsTo = (int) FilterBelonging.All,
                NumberToShow = 6,
                Type = FilterDisplayTypes.Checkbox
            };

            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsInPreg, "7", GrunndataFilterItem._IRegister, filterString: "isInPreg", displayName: "Finnes i PREG"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsNotInPreg, "4", GrunndataFilterItem._IRegister, filterString: "not isInPreg", displayName: "Finnes ikke i PREG"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsInHpr, "3", GrunndataFilterItem._IRegister, filterString: "isInHpr", displayName: "Finnes i HPR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsNotInHpr, "5", GrunndataFilterItem._IRegister,filterString: "not isInHpr", displayName: "Finnes ikke i HPR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsInFlr, "9", GrunndataFilterItem._IRegister, filterString: "isInFlr", displayName: "Finnes i FLR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsNotInFlr, "6", GrunndataFilterItem._IRegister, filterString: "not isInFlr", displayName: "Finnes ikke i FLR"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsInDifi, "10", GrunndataFilterItem._IRegister, filterString: "(difiStatus eq 1 or difiStatus eq 0)", displayName:"Finnes i Difi"));
            reg.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.IsNotInDifi, "11", GrunndataFilterItem._IRegister, filterString: "(difiStatus eq null or difiStatus eq 2)", displayName:"Finnes ikke i Difi"));

            foreach (var item in reg.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);


            return reg;
        }

        #endregion

        #region Alder
        private FilterGroup Alder()
        {
            var alder = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.AlderName,
                BelongsTo = (int) FilterBelonging.Preg,
                IsCustome = true,
                Type = FilterDisplayTypes.Age
            };

            alder.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.AlderFra, "1", GrunndataFilterItem._Alder, FilterType.DateTimeOffset, filterString: "fodselsDato le "));
            alder.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.AlderTil, "2", GrunndataFilterItem._Alder, FilterType.DateTimeOffset, filterString: "fodselsDato ge "));

            foreach (var item in alder.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return alder;
        } 

    
        #endregion

        #region Barn/Foreldre

        private FilterGroup Foreldre()
        {
            var foreldre = new FilterGroup()
            {
                Name = GrunndataPersonFilterConst.ForeldreName,
                BelongsTo = (int) FilterBelonging.Preg,
                IsCustome = true,
                Type = FilterDisplayTypes.LinkedCheckBox
            };


            foreldre.Items.Add(GrunndataFilterItem.GetFilterItem("Har foreldre", "Har foreldre", GrunndataPersonFilterConst.ForeldreName, filterString: "(momHasValidNin ne null or dadHasValidNin ne null)", displayName: "Har foreldre"));
            foreldre.Items.Add(GrunndataFilterItem.GetFilterItem("Har ikke foreldre", "Har ikke foreldre", GrunndataPersonFilterConst.ForeldreName, filterString: "(momHasValidNin eq null and dadHasValidNin eq null)", displayName: "Har ikke foreldre"));

            var foreldreExists = "Foreldre-NIN eksisterer i PREG";
            var foreldreExistsGroup = new FilterGroup()
            {
                BelongsTo = (int) FilterBelonging.Preg,
                Name = foreldreExists,
                IsCustome = true

            };

            foreldreExistsGroup.Items.Add(GrunndataFilterItem.GetFilterItem("Er i PREG", "1", foreldreExists, filterString: "(momHasValidNin eq true or dadHasValidNin eq true)", displayName:"Har foreldre som er i PREG"));
            foreldreExistsGroup.Items.Add(GrunndataFilterItem.GetFilterItem("Er ikke i PREG", "2", foreldreExists, filterString: "(momHasValidNin eq false or dadHasValidNin eq false)", displayName:"Har foreldre som ikke er i PREG"));
    
            foreldre.Groups.Add(foreldreExistsGroup);

            foreldre.Items.ForEach(i => _flatReferenceDic.Add(i.UniqueValue, i));

            return foreldre;
        }

        public FilterGroup Barn()
        {
            var barn = new FilterGroup()
            {
                Name = GrunndataPersonFilterConst.BarnName,
                BelongsTo = (int) FilterBelonging.Preg,
                IsCustome = true,
                Type = FilterDisplayTypes.Children
            };


            int previousAlder = -1;
            string previousFilter = "";

            foreach (var alder in QuantifyAge.Quants.Keys)
            {
                if (previousAlder == -1)
                {
                    barn.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarBarn, GrunndataPersonFilterConst.HarBarn, GrunndataPersonFilterConst.BarnName, filterString: "barn/any()", displayName: "Har barn"));
                    previousAlder = alder;
                    previousFilter = QuantifyAge.Quants[alder];
                    continue;
                }

                var name = $"{previousAlder} til {alder}";
                barn.Items.Add(GrunndataFilterItem.GetFilterItem(name, GrunndataPersonFilterConst.HarBarn + previousFilter, GrunndataPersonFilterConst.BarnName, filterString: $"barn/any(t: t eq '{previousFilter}')", displayName:"Har barn i alder " + name));

                previousAlder = alder;
                previousFilter = QuantifyAge.Quants[alder];
            }
            barn.Items.Add(GrunndataFilterItem.GetFilterItem("Fra og med" + previousAlder, GrunndataPersonFilterConst.HarBarn + previousFilter, GrunndataPersonFilterConst.BarnName, filterString: $"barn/any(t: t eq '{previousFilter}')", displayName:"Har barn eldre enn "+previousAlder));

            barn.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarIkkeBarn, GrunndataPersonFilterConst.HarIkkeBarn, GrunndataPersonFilterConst.BarnName, filterString: "not barn/any()", displayName: "Har ikke barn"));

            var foreldrerettGroupName = "Foreldrerett for barn";
            var foreldrerettGroup = new FilterGroup()
            {
                BelongsTo = (int) FilterBelonging.Preg,
                Name = foreldrerettGroupName,
                IsCustome = true
            };

            var noforeldrerettGroupName = "Ikke foreldrerett for barn";
            var noforeldrerettGroup = new FilterGroup()
            {
                BelongsTo = (int) FilterBelonging.Preg,
                Name = noforeldrerettGroupName,
                IsCustome = true

            };

            previousAlder = -1;
            previousFilter = "";


            foreach (var alder in QuantifyAge.Quants.Keys)
            {
                if (previousAlder == -1)
                {
                    foreldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem("I alle aldere", foreldrerettGroupName, foreldrerettGroupName, filterString: "barnForeldrerett/any()", displayName: "Har foreldreansvar"));
                    noforeldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem("I alle aldere", noforeldrerettGroupName, noforeldrerettGroupName, filterString: "barnUtenForeldrerett/any()", displayName:"Har ikke foreldreansvar"));
                    previousAlder = alder;
                    previousFilter = QuantifyAge.Quants[alder];
                    continue;
                }

                var name = $"{previousAlder} til {alder}";
                foreldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem(name, foreldrerettGroupName + previousFilter, foreldrerettGroupName, filterString: $"barnForeldrerett/any(t: t eq '{previousFilter}')", displayName: "Har foreldreansvar for barn i alder " + name));
                noforeldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem(name, noforeldrerettGroupName + previousFilter, noforeldrerettGroupName, filterString: $"barnUtenForeldrerett/any(t: t eq '{previousFilter}')", displayName:"Har ikke foreldreansvar for barn i alder " + name));

                previousAlder = alder;
                previousFilter = QuantifyAge.Quants[alder];
            }

            foreldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem($"Alder fra og med {previousAlder}", foreldrerettGroupName, foreldrerettGroupName, filterString: $"barnForeldrerett/any(t: t eq '{previousFilter}')"));
            noforeldrerettGroup.Items.Add(GrunndataFilterItem.GetFilterItem($"Alder fra og med {previousAlder}", noforeldrerettGroupName, noforeldrerettGroupName, filterString: $"barnUtenForeldrerett/any(t: t eq '{previousFilter}')"));

            barn.Groups.Add(foreldrerettGroup);
            barn.Groups.Add(noforeldrerettGroup);
            
            foreldrerettGroup.Items.ForEach(i => _flatReferenceDic.Add(i.UniqueValue, i));
            noforeldrerettGroup.Items.ForEach(i => _flatReferenceDic.Add(i.UniqueValue, i));
            barn.Items.ForEach(i => _flatReferenceDic.Add(i.UniqueValue, i));


            return barn;
        }

        #endregion

        #region Hpr

  
        public const string GodkjenningName = "Godkjenning (HPR)";
        private FilterGroup Godkjenning()
        {
            var godkjenning = new FilterGroup
            {
                Name = GodkjenningName,
                BelongsTo = (int) FilterBelonging.Hpr
            };

            var avsluttetStatus = new FilterGroup()
            {
                Name = "Avsluttet status",
                BelongsTo = (int) FilterBelonging.Hpr,
                NumberToShow = 4
            };

            avsluttetStatus.Items.Add(GrunndataFilterItem.GetFilterItem("Tilbakekalt", "1",avsluttetStatus.Name, filterString:"hprAvsluttetStatus/any(t: t eq '1')"));
            avsluttetStatus.Items.Add(GrunndataFilterItem.GetFilterItem("Vedtak ugyldiggjort", "2",avsluttetStatus.Name, filterString:"hprAvsluttetStatus/any(t: t eq '2')"));
            avsluttetStatus.Items.Add(GrunndataFilterItem.GetFilterItem("Frivillig avkalt", "3",avsluttetStatus.Name, filterString:"hprAvsluttetStatus/any(t: t eq '3')"));
            avsluttetStatus.Items.Add(GrunndataFilterItem.GetFilterItem("Avsluttet (historisk)", "99",avsluttetStatus.Name, filterString:"hprAvsluttetStatus/any(t: t eq '99')"));

            godkjenning.Groups.Add(avsluttetStatus);

            return godkjenning;
        }

       

        //private FilterGroup Rekvisisjonsrett(List<FilterItem> utgatteSuspenderte, out string utgattFilter, out string suspendertFilter)
        //{
        //    return GetGodkjenningItem("", "Rekvisisjonsrett", 7701, GrunndataPersonFilterConst._Revkisisjonsrett,
        //        "hprRekvisisjonsrett", new string[] {"1", "2", "11"}, out utgattFilter, out suspendertFilter, utgatteSuspenderte);
        //}

        //private FilterGroup GetGodkjenningItem(string displayName, string filtergroupName, int volvenCode,
        //    string hprFilterItemName, string filterStringSuffix, string[] sortCodes, out string utgattFilter, out string suspendertFilter, List<FilterItem> utgatteSuspenderte)
        //{
        //    var hkat = new FilterGroup
        //    {
        //        Name = filtergroupName,
        //        BelongsTo = (int) FilterBelonging.Hpr
        //    };

        //    var utgatte = new List<FilterItem>();
        //    var suspenderte = new List<FilterItem>();

        //    var codes = _codeService.GetCodesForOid(volvenCode, RegisterEnvironment.Test01);
        //    foreach (var code in codes)
        //    {
        //        hkat.Items.Add(GrunndataFilterItem.GetFilterItem(code.CodeText, code.CodeValue, hprFilterItemName, filterString: GetListFilterString(filterStringSuffix, code.CodeValue), displayName: displayName));
        //        utgatte.Add(GrunndataFilterItem.GetFilterItem(code.CodeText + " (Utgått)", RegisterPersonLogic.UtgattSuffix + code.CodeValue, hprFilterItemName, filterString: GetListFilterString(filterStringSuffix, RegisterPersonLogic.UtgattSuffix + code.CodeValue), displayName: displayName));
        //        suspenderte.Add(GrunndataFilterItem.GetFilterItem(code.CodeText + " (Suspendert)", RegisterPersonLogic.SuspendertSuffix + code.CodeValue, hprFilterItemName, filterString: GetListFilterString(filterStringSuffix, RegisterPersonLogic.SuspendertSuffix + code.CodeValue), displayName: displayName));
        //    }

        //    utgattFilter = GetListFilterStringWithOr(filterStringSuffix, utgatte.Where(i => i.Value.Contains(RegisterPersonLogic.UtgattSuffix)).Select(x => x.Value).ToArray());
        //    suspendertFilter = GetListFilterStringWithOr(filterStringSuffix, suspenderte.Where(i => i.Value.Contains(RegisterPersonLogic.SuspendertSuffix)).Select(x => x.Value).ToArray());

        //    SortValuesToStartOfList(hkat, sortCodes);

        //    foreach (var item in hkat.Items)
        //        _flatReferenceDic.Add(item.UniqueValue, item);

        //    utgatteSuspenderte.AddRange(utgatte);
        //    utgatteSuspenderte.AddRange(suspenderte);

        //    return hkat;
        //}

        //private FilterGroup HelsepersonellKategori(List<FilterItem> utgatteSuspenderte, out string utgattFilter, out string suspendertFilter)
        //{
        //    return GetGodkjenningItem("", "Helsepersonellkategori", 9060, GrunndataPersonFilterConst._Helsepersonellkategori, "hprHelsepersonellKategori", new string[] { "LE", "SP", "JO"}, out utgattFilter, out suspendertFilter, utgatteSuspenderte);
        //}



        //private FilterGroup Autorisasjon(List<FilterItem> utgatteSuspenderte, out string utgattFilter, out string suspendertFilter)
        //{
        //    return GetGodkjenningItem("", "Autorisasjon", 7704, GrunndataPersonFilterConst._Autorisasjon, "hprAutorisasjon",
        //        new string[] {"1", "17", "4"}, out utgattFilter, out suspendertFilter, utgatteSuspenderte);
        //}

        #endregion

        #region Preg

        private FilterGroup Ektefelle()
        {
            var ektefelle = new FilterGroup
            {
                Name = GrunndataFilterItem._Ektefelle,
                BelongsTo = (int) FilterBelonging.Preg,
                NumberToShow = 2
            };


            ektefelle.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarEktefelle, "1", GrunndataFilterItem._Ektefelle, filterString: "(ektefelleNin ne null)"));
            ektefelle.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarEiEktefelle, "1", GrunndataFilterItem._Ektefelle, filterString: "(ektefelleNin eq null and isInPreg eq true)"));
            
            foreach (var item in ektefelle.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return ektefelle;
        }

        private FilterGroup PregIdentity()
        {
            var id = new FilterGroup
            {
                Name = GrunndataFilterItem._Id,
                BelongsTo = (int) FilterBelonging.Preg,
                NumberToShow = 5
            };


            id.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarFodselsnr, "1", GrunndataFilterItem._Id, filterString: "(nin ne null and hasDnummer eq false)"));
            id.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarDummer, "2", GrunndataFilterItem._Id, filterString: "hasDnummer"));
            id.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarGyldigNin, "3", GrunndataFilterItem._Id, filterString: "validNin"));
            id.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.HarIkkeGyldigNin, "4", GrunndataFilterItem._Id, filterString: "not validNin"));
            id.Items.Add(GrunndataFilterItem.GetFilterItem(GrunndataPersonFilterConst.NinMed0ere, "5", GrunndataFilterItem._Id, filterString: "ninFiveZeros"));
            
            foreach (var item in id.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return id;
        }

        //private FilterGroup SivilStand()
        //{
        //    var regStatus = new FilterGroup
        //    {
        //        Name = GrunndataPersonFilterConst.Sivilstand,
        //        BelongsTo = (int) FilterBelonging.Preg,
        //        NumberToShow = 3
        //    };


        //    var codes = new[] { "1,Ugift", "2,Gift", "3,Enke/enkemann", "4,Skilt", "5,Separert", "6,Registrert partner", "7,Separert partner", "8,Skilt partner", "9,Gjenlevende partner" };

        //    foreach (var item in codes)
        //    {
        //        var splitted = item.Split(',');
        //        var code = new Code()
        //        {
        //            CodeValue = splitted[0],
        //            CodeText = splitted[1]
        //        };

        //        regStatus.Items.Add(GrunndataFilterItem.GetFilterItem(code.CodeText, code.CodeValue, GrunndataFilterItem._Sivilstand, filterString: $"(sivilstand eq {code.CodeValue})"));
        //    }

        //    foreach (var item in regStatus.Items)
        //        _flatReferenceDic.Add(item.UniqueValue, item);

        //    return regStatus;
        //}

        private FilterGroup RegStatus()
        {
            var codes = new [] { "", "Bosatt", "Utflyttet", "Utvandret", "Forsvunnet", "Død", "Utgått fødselsnummer, korrigert til nytt", "Fødselsregistrert", "Annullert tilgang", "Uregistrert tilgang" };

            var regStatus = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.Registreringskode,
                BelongsTo = (int) FilterBelonging.Preg,
                NumberToShow = 2
            };


            for (int i = 1; i < codes.Length; i++)
            {
                regStatus.Items.Add(GrunndataFilterItem.GetFilterItem(codes[i],i.ToString(), GrunndataFilterItem._RegStatus, filterString:$"(regStatus eq {i})"));
            }
             
            SortValuesToStartOfList(regStatus,"3","5");   
            
            foreach (var item in regStatus.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return regStatus;
        }

        private FilterGroup AdresseKode()
        {
            var codes = new[]
            {
                "Vanlig bosatt", "Utenriks", "Militær", "Svalbard", "Klientadresse", "Uten fast bopel",
                "Sperret adresse, strengt fortrolig", "Sperret adresse, fortrolig", "Pendler"
            };

            var adresseKode = new FilterGroup
            {
                Name = GrunndataPersonFilterConst.AdresseKodeName,
                BelongsTo = (int) FilterBelonging.Preg,
                NumberToShow = 2
            };


            for (int i = 0; i < codes.Length; i++)
            {
                adresseKode.Items.Add(GrunndataFilterItem.GetFilterItem(codes[i], i.ToString(), GrunndataFilterItem._AdresseKode, filterString: $"(adresseKode eq {i})"));
            }

            SortValuesToStartOfList(adresseKode, "6", "7");

            foreach (var item in adresseKode.Items)
                _flatReferenceDic.Add(item.UniqueValue, item);

            return adresseKode;
        }

        #endregion

    }

}