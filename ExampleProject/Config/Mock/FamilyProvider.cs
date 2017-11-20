using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Search;

namespace TestdataApp.ExampleProject.Config.Mock
{
    public class FamilyProvider : IFamilyProvider
    {
        public async Task<Family> GetFamily(string personPnr)
        {
            return new Family
            {
                Father = new FamilyMember()
                {
                    Age = 52,
                    BirthDate = DateTime.Now.AddDays(-52),
                    Custody = "Delt",
                    Name = "Far Faresen",
                    Nin = "12940243830",
                    DateAndAgeString = "52 år"
                },
                Mother = new FamilyMember()
                {
                    Age = 72,
                    BirthDate = DateTime.Now.AddDays(-57),
                    Custody = "Delt",
                    Name = "Mor Moresen",
                    Nin = "20430243830",
                    DateAndAgeString = "72 år"
                },
                NumberOfParents = 2,
                Person = new FamilyMember()
                {
                    Age = 22,
                    BirthDate = DateTime.Now.AddDays(-22),
                    Custody = "Delt",
                    Name = "Pers On",
                    Nin = "12940243830",
                    DateAndAgeString = "22 år"
                }
            };
        }
    }
}