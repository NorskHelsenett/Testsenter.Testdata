using TestdataApp.Common.Models.DTO;

namespace TestdataApp.ExampleProject.Models
{
    public class BusinessDetails : BaseDetails
    {
        public string ArJson { get; set; }
        public string BedRegJson { get; set; }
        public string FlrJson { get; set; }
        public string HtkJson { get; set; }
        public string ReshJson { get; set; }

        public BusinessDetails() : base(true, false)
        {
        }
    }
}