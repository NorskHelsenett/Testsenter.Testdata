using System;

namespace TestdataApp.Common.Models.DTO
{
    public class Family
    {
        public int NumberOfParents { get; set; }
        public FamilyMember Mother { get; set; }
        public FamilyMember Father { get; set; }
        public FamilyMember Person { get; set; }
        public FamilyMember[] Children { get; set; }
    }

    public class FamilyMember
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Nin { get; set; }
        public DateTime? DeathDate { get; set; }
        public string DateAndAgeString { get; set; }
        public string Custody { get; set; }
    }
}
