using System.Collections.Generic;

namespace TestdataApp.Common.Security
{
    public interface ITeamProvider
    {
        Team GetTeam(int id);
        IEnumerable<Team> GetAll();
    }
}
