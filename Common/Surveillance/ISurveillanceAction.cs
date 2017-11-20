using System.Threading.Tasks;
using Shared.Common.DI;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;

namespace TestdataApp.Common.Surveillance
{
    public interface ISurveillanceAction
    {
        string ApplicableRegister();
        bool ApplicableForHit(Hit hit);
        string GetFriendlyName();
        string GetKey();
        bool ValidJson(string json);
        Task<SurveillanceResult> Check(SurveilledItem registeredItem, IDependencyInjector dis);
    }
}
