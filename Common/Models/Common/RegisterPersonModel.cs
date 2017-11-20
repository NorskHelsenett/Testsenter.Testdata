using System;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using Shared.Common.Storage;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Models.Common
{
    [SerializePropertyNamesAsCamelCase]
    public class RegisterPersonModel : IndexEntity, IIndexEntity, IJsonStorageEntity
    {
        public RegisterPersonModel() { }

        [IsFilterable, IsSearchable]
        public string Nin { get; set; }
        [IsFilterable]
        public bool? ValidNin { get; set; }
        [IsFilterable]
        public bool? NinFiveZeros { get; set; }
        [IsFilterable]
        public int? HprNr { get; set; }
        [IsFilterable, IsSearchable]
        public string HprNrStr { get; set; }
        [IsSearchable, IsSortable]
        public string HprName { get; set; }
        [IsFilterable]
        public string[] HprHelsepersonellKategori { get; set; }
        [IsFilterable]
        public string[] HprAutorisasjon { get; set; }
        [IsFilterable]
        public string[] HprRekvisisjonsrett { get; set; }
        [IsFilterable]
        public string[] HprAvsluttetStatus { get; set; }
        [IsFilterable]
        public string[] HprSpesialitet { get; set; }
        [IsFilterable, IsSortable]
        public DateTimeOffset? FodselsDato { get; set; }
        [IsFilterable]
        public int? Kjonn { get; set; }
        [IsFilterable]
        public string[] Barn { get; set; }
        [IsFilterable]
        public string[] BarnForeldrerett { get; set; }
        [IsFilterable]
        public string[] BarnUtenForeldrerett { get; set; }
        [IsFilterable]
        public bool? HarForeldrerett { get; set; }
        [IsFilterable]
        public bool? MomHasValidNin { get; set; }
        [IsFilterable]
        public bool? DadHasValidNin { get; set; }
        [IsFilterable]
        public int? RegStatus { get; set; }
        [IsFilterable, IsSearchable]
        public string EktefelleNin { get; set; }
        [IsFilterable]
        public int? AdresseKode { get; set; }
        public string Info { get; set; }
        [IsSearchable, IsSortable]
        public string PregName { get; set; }
        [IsFilterable]
        public bool? HasDnummer { get; set; }
        [IsFilterable]
        public int? Sivilstand { get; set; }
        
        
        
        //FLR
        [IsFilterable]
        public string[] Pasienter { get; set; }
        [IsFilterable]
        public string[] Fastlegestillinger { get; set; }
        [IsFilterable]
        public string[] Harfastlegemedstillinger { get; set; }
        [IsFilterable]
        public string[] FastlegeHprNr { get; set; }
        [IsFilterable]
        public string[] VikarHprNr { get; set; }
        [IsFilterable]
        public string[] DelelisteHprNr { get; set; }
        [IsFilterable]
        public bool? HasFastlege { get; set; }
        [IsFilterable]
        public bool? HasFastlegeinfo { get; set; }
        [IsFilterable]
        public string Fastlegesessionid { get; set; }

        //Difi
        [IsFilterable]
        public int? DifiStatus { get; set; }
        [IsFilterable]
        public string DifiElectrionicAdresseType { get; set; }
        [IsSearchable]
        public string DifiPhoneNumber { get; set; }
        [IsSearchable]
        public string DifiEmail { get; set; }
        [IsFilterable]
        public int? DifiVarslingsStatus { get; set; }
        [IsFilterable]
        public bool? DifiReservasjon { get; set; }

        //Ofr
        [IsFilterable]
        public bool? IsInSensitiveOfrRegister { get; set; }
        [IsFilterable]
        public string[] OfrRegisterTypes { get; set; }
        [IsFilterable]
        public bool? IsInRelevantForAllOfrRegister { get; set; }
        [IsFilterable]
        public string[] OfrRegisterLegalJustification { get; set; }



        [IsFilterable]
        public bool? IsInPreg { get; set; }
        [IsFilterable]
        public bool? IsInHpr { get; set; }
        [IsFilterable]
        public bool? IsInFlr { get; set; }
        [IsFilterable]
        public bool? IsInAr { get; set; }
        [IsFilterable]
        public bool? IsInOfr { get; set; }
   
        [IsFilterable]
        public DateTimeOffset? LastFlrUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastHprUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastDifiUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastPregUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastArUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastOfrUpdate { get; set; }
    }
}