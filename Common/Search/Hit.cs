namespace TestdataApp.Common.Search
{
    public abstract class Hit 
    {
        protected Hit(int environmentId, string id)
        {
            RegisterEnvironmentInt = environmentId;
            Id = id;
        }

        public string Id { get; set; }

        public string RegisterName { get; set; }
        public string ContentAsJson { get;set; }
        public int RegisterEnvironmentInt { get; set; }
        public string CommonIdentifier { get; set; }
        public string GetActionInstanceIdentifier()
        {
            return Id;
        }
    }
}