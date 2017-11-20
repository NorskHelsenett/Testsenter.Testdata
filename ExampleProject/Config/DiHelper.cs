using System;
using System.IO;
using System.Text;
using log4net;
using Newtonsoft.Json;
using Shared.Common.DI;
using Shared.Common.Log;
using Shared.Common.Storage;
using TestdataApp.Common;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Search;
using TestdataApp.ExampleProject.Config.Mock;
using TestdataApp.ExampleProject.Config.Mock.Filter;
using TestdataApp.ExampleProject.Controllers;
using TestdataApp.ExampleProject.Filter;
using TestdataApp.ExampleProject.Models;
using TestdataApp.ExampleProject.User;

namespace TestdataApp.ExampleProject.Config
{
    public class DiHelper : IDiHelper
    {
        public void PreRegistrations(UnityDependencyInjector di)
        {
            di.RegisterInstance<IFamilyProvider>(new FamilyProvider());
        }

        public void PostRegistrations(UnityDependencyInjector di)
        {
        }

        public bool UseRealStorage()
        {
            return false;
        }

        public void RegisterPersonAzureSearch(UnityDependencyInjector di, string azureApiKey, string azureSearchIndexName, IndexTypeName type, InstanceLifetime instanceLifetime)
        {
            var mockedIndex = new MockPersonAzureSearch();

            var dataBytes = (byte[]) Properties.Resources.ResourceManager.GetObject("indexdata");
            if(dataBytes == null)
                throw new ArgumentException("kunne ikke lese fil");

            bool hasMoreLines = true;
            var file = new MemoryStream(dataBytes);
            var reader = new StreamReader(file);

            while (!reader.EndOfStream)
            {
                var nextLine = reader.ReadLine();
                var person = JsonConvert.DeserializeObject<RegisterPersonModel>(nextLine);
                mockedIndex.Db.Add(person.CommonIdentifier, person);
            }

            di.RegisterInstance<IAzureSearch<RegisterPersonModel>>(mockedIndex);
        }

        public static T Deserialize<T>(byte[] data) where T : class
        {
            using (var stream = new MemoryStream(data))
            using (var reader = new StreamReader(stream, Encoding.UTF8))
                return JsonSerializer.Create().Deserialize(reader, typeof(T)) as T;
        }

        public void RegisterBusinessAzureSearch(UnityDependencyInjector di, string azureApiKey, string azureSearchIndexName, IndexTypeName type, InstanceLifetime instanceLifetime)
        {
            var mockedBusinessIndex = new MockBusinessAzureSearch();
            di.RegisterInstance<IAzureSearch<RegisterBusinessModel>>(mockedBusinessIndex);
        }

        public void RegisterCustomStorages(IRegisterStorage registerer)
        {
        }

        public ILog GetCustomLogger()
        {
            return new DummyLog();
        }

        public Type GetPersonSearchIndexType()
        {
            return typeof(RegisterPersonModel);
        }

        public Type GetBusinessSearchIndexType()
        {
            return typeof(RegisterBusinessModel);
        }

        public Type GetPersonFilterType()
        {
            return typeof(GrunndataPersonFilter);
        }

        public Type GetBusinessFilterType()
        {
            return typeof(GrunndataBusinessFilter);
        }

        public Type GetUserManager()
        {
            return typeof(UserManager);
        }

        public Type GetTeamProvider()
        {
            return typeof(HardcodedTeams);
        }

        public Type GetSurveillanceController()
        {
            return typeof(Controllers.SurveillanceController);
        }

        public Type GetTagController()
        {
            return typeof(TagController);
        }

        public Type GetDetailsProvider()
        {
            return typeof(DetailsProvider);
        }

        public Type GetSearchController()
        {
            return typeof(SearchController);
        }
    }
}