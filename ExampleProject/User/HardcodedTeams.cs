using System.Collections.Generic;
using System.Linq;
using TestdataApp.Common.Security;

namespace TestdataApp.ExampleProject.User
{
    public class HardcodedTeams : ITeamProvider
    {
        public static Team[] Projects = {
            new Team(0, "Helsenorge"),
            new Team(1, "E-Resept"),
            new Team(2, "Kjernejournal"),
            new Team(3, "Grunndata"),
            new Team(4, "FIA-prosjektet"),
            new Team(5, "Helsedirektoratet"),
            new Team(6, "NHN"),
            new Team(7, "Annet"),
        };

        public Team GetTeam(int id)
        {
            return Projects.Single(y => y.Id == id);
        }

        public IEnumerable<Team> GetAll()
        {
            return Projects;
        }
    }
}