using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Shared.Common.DI;
using Shared.Common.Resources;
using Shared.Common.Storage;
using TestdataApp.Common.Controllers;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Search;

namespace TestdataApp.ExampleProject.Controllers
{
    [FilterConfig.WebApiLogExceptionHandlerAttribute]
    public class SurveillanceController : SurveillanceController<RegisterPersonModel>, ISurveillanceController
    {
        private const string Route = "api/Surveillance/{commonidentifier}/{actionKey}/{actionInstanceId}/{registerEnvironment}";

        public SurveillanceController(IDependencyInjector di) : base(di, di.GetInstance<IAzureSearch<RegisterPersonModel>>(), di.GetInstance<IJsonStorage<BuildIndexComplete>>())
        {
        }

        [HttpGet]
        [Route("api/Surveillance/All")]
        public override async Task<IEnumerable<LatestSurveillanceResult>> GetLatestResults() => await base.GetLatestResults();

        [HttpGet]
        [Route("api/Surveillance/Next")]
        public override DateTime? NextCheck() => base.NextCheck();

        [HttpGet]
        [Route("api/Surveillance/Previous")]
        public override DateTime? PreviousCheck() => base.PreviousCheck();

        [HttpGet]
        [Route("api/Surveillance/synchronized/")]
        public override async Task<IEnumerable<Tuple<string, DateTime>>> GetSynctimes() => await base.GetSynctimes();

        [Authorize(Roles = "Admin")]
        [Route("api/Surveillance/PeriodicJob/Run")]
        public override async Task<bool> Run() => await base.Run();

        [HttpPost]
        [Route(Route)]
        public override async Task<bool> On(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content)
        {
            return await base.On(commonidentifier, actionKey, actionInstanceId, registerEnvironment, content);
        }

        [HttpDelete]
        [Route(Route)]
        public override async Task<bool> Off(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment)
        {
            return await base.Off(commonidentifier, actionKey, actionInstanceId, registerEnvironment);
        }

        [HttpPut]
        [Route("api/Surveillance/{commonidentifier}/{actionKey}/{actionInstanceId}/{registerEnvironment}")]
        public override async Task<bool> AcceptChanges(string commonidentifier, string actionKey, string actionInstanceId, int registerEnvironment, [FromBody] string content) => await base.AcceptChanges(commonidentifier, actionKey, actionInstanceId, registerEnvironment, content);

    }
}