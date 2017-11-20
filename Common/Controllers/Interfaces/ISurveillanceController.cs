using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using TestdataApp.Common.Models.DbEntities;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface ISurveillanceController : IDisposable
    {
        Task<bool> Run();
        Task<bool> On(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content);
        Task<bool> Off(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment);
        Task<IEnumerable<LatestSurveillanceResult>> GetLatestResults();
        DateTime? NextCheck();
        DateTime? PreviousCheck();
        Task<IEnumerable<Tuple<string, DateTime>>> GetSynctimes();
        Task<bool> AcceptChanges(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content);
    }
}
