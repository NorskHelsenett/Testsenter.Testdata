using System;
using log4net;
using Shared.Common.DI;
using Shared.Common.Storage;
using TestdataApp.Common.Search;

namespace TestdataApp.Common
{
    public interface IDiHelper
    {
        void PreRegistrations(UnityDependencyInjector di);
        void PostRegistrations(UnityDependencyInjector di);
        bool UseRealStorage();
        void RegisterPersonAzureSearch(UnityDependencyInjector di, string azureApiKey, string azureSearchIndexName, IndexTypeName type, InstanceLifetime instanceLifetime); //someting like Register<IAzureSearch<RegisterBusinessModel>, AzureSearch<RegisterBusinessModel>>(instanceLifetime, RegisterEnvironment.Test01.ToString(), new object[] { searchServiceName, queryApiKey, Constants.AzureSearchIndexes.Business.ToString().ToLower() });
        void RegisterBusinessAzureSearch(UnityDependencyInjector di, string azureApiKey, string azureSearchIndexName, IndexTypeName type, InstanceLifetime instanceLifetime); //someting like Register<IAzureSearch<RegisterBusinessModel>, AzureSearch<RegisterBusinessModel>>(instanceLifetime, RegisterEnvironment.Test01.ToString(), new object[] { searchServiceName, queryApiKey, Constants.AzureSearchIndexes.Business.ToString().ToLower() });
        void RegisterCustomStorages(IRegisterStorage registerer); //if you need more databases than required for baseline
        ILog GetCustomLogger(); //return null if you want the framework to create one

        Type GetPersonSearchIndexType();
        Type GetBusinessSearchIndexType();

        Type GetPersonFilterType();
        Type GetBusinessFilterType();
        Type GetUserManager();
        Type GetTeamProvider();

        Type GetSurveillanceController();
        Type GetTagController();
        Type GetDetailsProvider();
        Type GetSearchController();
    }
}
