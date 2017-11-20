using System;
using System.Linq;
using log4net;
using Shared.Common.Azure.BlobStorage;
using Shared.Common.Azure.DI;
using Shared.Common.Azure.Queue;
using Shared.Common.Azure.TableStorage;
using Shared.Common.DI;
using Shared.Common.Log;
using Shared.Common.Resources;
using Shared.Common.Storage;
using Shared.Common.Storage.Mock;
using TestdataApp.Common.Controllers;
using TestdataApp.Common.Controllers.Interfaces;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DbEntities;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Models.DTO.Filter;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.Common
{
    public class DiRegistrations: UnityDependencyInjector, IDependencyInjector
    {
        private readonly IConstantsProvider _cp;
        private readonly IDiHelper _diHelper;
        private readonly bool _useCacheForSurveillanceResult;

        public DiRegistrations(IConstantsProvider cp, ServiceDescription caller, IDiHelper diHelper, bool useCacheForSurveillanceResult = true) : base(caller)
        {
            _cp = cp;
            RegisterInstance<IConstantsProvider>(cp);
            _diHelper = diHelper;
            _useCacheForSurveillanceResult = useCacheForSurveillanceResult;

            _diHelper.PreRegistrations(this);
            Do();
            _diHelper.PostRegistrations(this);
        }

        private void Do()
        {
            Logger();
            Storage();
            SearchIndex();
            Filters();
            UserManagement();
            Controllers();
        }

        private void Controllers()
        {
            Register<IHomeController, HomeController>();
            Register<IUserController, UserController>();
            Register<IFilterController, FilterController>();

            CheckAndRegisterType(_diHelper.GetDetailsProvider, typeof(IDetailsProvider), InstanceLifetime.ReturnSameInstanceForEachResolve);
            Register<IDetailsController, DetailsController>();

            CheckAndRegisterType(_diHelper.GetSurveillanceController, typeof(ISurveillanceController), tolerateNull: true);
            CheckAndRegisterType(_diHelper.GetTagController, typeof(ITagController));
            CheckAndRegisterType(_diHelper.GetSearchController, typeof(ISearchController));
        }

        private void UserManagement()
        {
            RegisterInstance<IUserClaims>(new ClaimsUserInfoProvider());
            CheckAndRegisterType(_diHelper.GetUserManager, typeof(IUserManager), InstanceLifetime.ReturnSameInstanceForEachResolve);
            CheckAndRegisterType(_diHelper.GetUserManager, typeof(IUserManager), InstanceLifetime.ReturnSameInstanceForEachResolve);
            CheckAndRegisterType(_diHelper.GetTeamProvider, typeof(ITeamProvider), InstanceLifetime.ReturnSameInstanceForEachResolve);
        }

        private void Filters()
        {
            CheckAndRegisterType(_diHelper.GetPersonFilterType, typeof(IPersonFilterManager), InstanceLifetime.ReturnNewInstanceForEachResolve);
            CheckAndRegisterType(_diHelper.GetBusinessFilterType, typeof(IBusinessFilterManager), InstanceLifetime.ReturnNewInstanceForEachResolve);
        }

        private void Logger()
        {
            var customLogger = _diHelper.GetCustomLogger();
            if (customLogger != null)
            {
                RegisterInstance<ILog>(customLogger);
            }
            else
            {
                LogConfigurations.ConfigureLogglyAppender();
                RegisterInstance<ILog>(LogManager.GetLogger(InstanceDescription.ToString()));
            }
        }

        private void SearchIndex()
        {
            var instanceLifetime = _cp.SearchIndex_UseSingleton() ? InstanceLifetime.ReturnNewInstanceForEachResolve : InstanceLifetime.ReturnSameInstanceForEachResolve;
            string searchServiceName = _cp.GetSearchIndexName();
            string queryApiKey = _cp.GetSearchApiKey();

            _diHelper.RegisterBusinessAzureSearch(this, queryApiKey, searchServiceName, IndexTypeName.Business, instanceLifetime);
            _diHelper.RegisterPersonAzureSearch(this, queryApiKey, searchServiceName, IndexTypeName.Person, instanceLifetime);

            var personIndexType = _diHelper.GetPersonSearchIndexType();
            if(!Implements(personIndexType, typeof(IIndexEntity)))
                throw new ArgumentException("diHelper.GetPersonSearchIndexType() ga ikke tilbake en type som implementerer IIndexEntity");

            PersonIndexEntityModelBinder.StrongType = personIndexType;

            var bizIndexType = _diHelper.GetBusinessSearchIndexType();
            if (!Implements(bizIndexType, typeof(IIndexEntity)))
                throw new ArgumentException("diHelper.GetBusinessSearchIndexType() ga ikke tilbake en type som implementerer IIndexEntity");

            BusinessIndexEntityModelBinder.StrongType = bizIndexType;
        }

        private void Storage()
        {
            if (_diHelper.UseRealStorage())
                RegisterInstance<IRegisterStorage>(new AzureStorageRegisterer(this));
            else
                RegisterInstance<IRegisterStorage>(new HodorStorageMock(this));

            var registerer = GetInstance<IRegisterStorage>();

            if (_useCacheForSurveillanceResult)
                RegisterInstance<ITableStorageDb<SurveilledItem>>(new SuveilledItemCache(registerer.GetTableStorageDb<SurveilledItem>(_cp.Table_SurveillanceItem().Name, _cp.Table_SurveillanceItem().StorageAccountKey)));
            else
                registerer.RegisterTableStorageDb<SurveilledItem>(InstanceLifetime.ReturnSameInstanceForEachResolve, _cp.Table_SurveillanceItem().Name, _cp.Table_SurveillanceItem().StorageAccountKey);

            StorageRegisterHelper.RegisterJsonStorage<BuildIndexComplete>(registerer, _cp.Table_BuildIndexComplete().Name, _cp.Table_BuildIndexComplete().StorageAccountKey);
            StorageRegisterHelper.RegisterJsonStorage<SurveillanceResult>(registerer, _cp.Table_SurveillanceResult().Name, _cp.Table_SurveillanceResult().StorageAccountKey);
            StorageRegisterHelper.RegisterJsonStorage<LatestSurveillanceResult>(registerer, _cp.Table_LatestSurveillanceResult().Name, _cp.Table_LatestSurveillanceResult().StorageAccountKey);
            StorageRegisterHelper.RegisterJsonStorage<Tag>(registerer, _cp.Table_Tag().Name, _cp.Table_Tag().StorageAccountKey);

            StorageRegisterHelper.RegisterJsonStorage<SearchQuery>(registerer, _cp.Table_SearchQuery().Name, _cp.Table_SearchQuery().StorageAccountKey);
            StorageRegisterHelper.RegisterJsonStorage<Comment>(registerer, _cp.Table_Comment().Name, _cp.Table_Comment().StorageAccountKey);

            registerer.RegisterQueue(InstanceLifetime.ReturnSameInstanceForEachResolve, _cp.Queue_Surveillance().Name, _cp.Queue_Surveillance().StorageAccountKey);
            registerer.RegisterQueue(InstanceLifetime.ReturnSameInstanceForEachResolve, _cp.Queue_BuildIndex().Name, _cp.Queue_BuildIndex().StorageAccountKey);

            _diHelper.RegisterCustomStorages(registerer);
        }

        private bool Implements(Type thisOne, Type implementsThis)
        {
            return thisOne.GetInterfaces().Contains(implementsThis);
        }

        private void CheckAndRegisterType(Func<Type> getter, Type @interface, InstanceLifetime lifetime = InstanceLifetime.ReturnNewInstanceForEachResolve, bool tolerateNull = false)
        {
            var classType = getter();
            if (classType == null)
                if (tolerateNull)
                    return;
                else
                    throw new ArgumentException($"Gitt type var null");

            if (!Implements(classType, @interface))
                throw new ArgumentException($"Gitt type implementerer ikke {@interface.Name}");

            Register(@interface, classType, lifetime);
        }
    }


    public class HodorStorageMock : RegisterStoreMock
    {
        public HodorStorageMock(UnityDependencyInjector di) : base(di)
        {
        }

        public override void RegisterTableStorageDb<TType>(InstanceLifetime lifeTime, string tableName, string storageAccountSettingsvalue)
        {
            Di.Register<ITableStorageDb<TType>, TableStorageDbMock<TType>>(InstanceLifetime.ReturnSameInstanceForEachResolve);
        }

        public override void RegisterQueue(InstanceLifetime lifeTime, string queueName, string storageAccountSettingsvalue)
        {
            Di.RegisterInstance<IQueue>(new AzureQueueMock(), queueName.ToString());
        }

        //using real blobstorage
        public override void RegisterBlobStorage(InstanceLifetime lifeTime, string blobContainerName, string storageAccountSettingsvalue)
        {
            Di.Register<IBlobStorageDb, BlobStorageDb>(lifeTime, blobContainerName.ToString(), new object[] { storageAccountSettingsvalue, blobContainerName });
        }

        public override ITableStorageDb<TType> GetTableStorageDb<TType>(string tableName, string storageAccountSettingsvalue)
        {
            return new TableStorageDbMock<TType>();
        }
    }
}
