namespace TestdataApp.Common.Security
{
    public interface IUserClaims
    {
        string GetFriendlyName();
        string GetEmail();
        Team GetTeam(ITeamProvider tp);
    }
}
