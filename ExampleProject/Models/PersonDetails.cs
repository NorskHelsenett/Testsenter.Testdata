using TestdataApp.Common.Models.DTO;

namespace TestdataApp.ExampleProject.Models
{
    public class PersonDetails : BaseDetails
    {
        public string PregJson { get; set; }
        public string HprJson { get; set; }
        public string FastlegeJson { get; set; }
        public string FastlegePasientJson { get; set; }
        public string DifiInformationJson { get; set; }

        public PersonDetails() : base(true, true)
        {
        }
    }
}