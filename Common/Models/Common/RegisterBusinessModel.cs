using System;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Models.Common
{
    [SerializePropertyNamesAsCamelCase]
    public class RegisterBusinessModel : IndexEntity, IIndexEntity
    {
        [IsSearchable, IsFilterable, IsSortable]
        public string DisplayName { get; set; }
        [IsSearchable, IsFilterable, IsSortable]
        public string Name { get; set; }
        [IsFilterable]
        public string[] ElectronicAddressTypes { get; set; }
        [IsFilterable, IsSearchable]
        public string HerId { get; set; }
        [IsFilterable]
        public int? MunicipalityNumber { get; set; }
        [IsFilterable]
        public string ParentBusinessType { get; set; }
        [IsFilterable]
        public string ParentHerId { get; set; }
        [IsFilterable]
        public string ParentOrgNr { get; set; }
        [IsFilterable]
        public string[] PhysicalAddressTypes { get; set; }
        [IsFilterable]
        public string CommunicationPartyType { get; set; }
        [IsFilterable]
        public DateTimeOffset? ArValidFrom { get; set; }
        [IsFilterable]
        public DateTimeOffset? ArValidTo { get; set; }
        [IsFilterable]
        public bool? IsValidCommunicationParty { get; set; }
        [IsFilterable]
        public string BusinessType { get; set; }
        [IsFilterable]
        public string[] IndustryCodes { get; set; }
        [IsSearchable, IsFilterable]
        public string OrganizationNumber { get; set; }
        [IsFilterable]
        public string ServiceCode { get; set; }
        //HTK
        [IsFilterable]
        public bool? HtkIsGovernmentCompany{ get; set; }
        [IsFilterable]
        public DateTimeOffset? HtkLastChanged{ get; set; }
        [IsFilterable]
        public DateTimeOffset? HtkValidFrom { get; set; }
        [IsFilterable]
        public DateTimeOffset? HtkValidTo { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastServiceToDate { get; set; }
        [IsFilterable]
        public DateTimeOffset? FirstServiceToDate { get; set; }

        [IsFilterable]
        public DateTimeOffset? LastServiceVariantTypedValueToDate { get; set; }
        [IsFilterable]
        public DateTimeOffset? FirstServiceVariantTypedValueToDate { get; set; }
        [IsFilterable]
        public bool? HasTreatmentWithDisplayName { get; set; }
        [IsFilterable]
        public bool? HasOwnerHtKDescription { get; set; }
        [IsFilterable]
        public string[] WaitingTimes { get; set; }

        //Resh
        [IsSearchable, IsFilterable]
        public string  ReshId { get; set; }
        [IsSearchable,IsFilterable]
        public string ReshShortName { get; set; }
        [IsFilterable]
        public string[] ReshChildren { get; set; }
        [IsFilterable]
        public int? TreatmentFacility { get; set; }
        [IsFilterable]
        public string[] VolumNumbers { get; set; }

        //FLR
        [IsFilterable]
        public string[] GPContractStatuses { get; set; }
        [IsFilterable]
        public string[] GPContractEndReasons { get; set; }
        [IsFilterable]
        public bool? HasGPContractThatRequireMembership { get; set; }
        [IsFilterable]
        public string[] GpContractMaxPatients { get; set; }

        //OFR
        [IsFilterable]
        public bool? HasSensitiveOfrRegister { get; set; }
        [IsFilterable]
        public bool? HasOfrRegisterWithParticipants { get; set; }
        [IsFilterable]
        public string[] OfrRegisterTypes { get; set; }
        [IsFilterable]
        public bool? HasRelevantForAllOfrRegister { get; set; }
        [IsFilterable]
        public string[] OfrRegisterLegalJustifications { get; set; }


        [IsFilterable]
        public bool? IsInAr { get; set; }
        [IsFilterable]
        public bool? IsInFlr { get; set; }
        [IsFilterable]
        public bool? IsInHtk { get; set; }
        [IsFilterable]
        public bool? IsInBedReg { get; set; }
        [IsFilterable]
        public bool? IsInResh { get; set; }
        [IsFilterable]
        public bool? IsInOfr { get; set; }

        [IsFilterable]
        public DateTimeOffset? LastArUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastFlrUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastHtkUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastBedRegUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastReshUpdate { get; set; }
        [IsFilterable]
        public DateTimeOffset? LastOfrUpdate { get; set; }
    }

}
