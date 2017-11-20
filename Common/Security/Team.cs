namespace TestdataApp.Common.Security
{
    public class Team
    {
        public string Name { get; set; }
        public int Id { get; set; }

        public Team(int id, string name)
        {
            Name = name;
            Id = id;
        }

        public Team() { }
    }
}
