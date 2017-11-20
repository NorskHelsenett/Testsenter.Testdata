namespace TestdataApp.Common.Models.DTO
{
    public class UserData
    {
        public string Name { get; set; }
        public string RegisterUserName { get; set; }
        public string RegisterPassword { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string OldPassword { get; set; }
        public bool HasValidRegisterUser { get; set; }
        public bool HasAcceptedTerms { get; set; }
        public int ProjectValue { get; set; }
        public int RoleValue { get; set; }
        public string SearchApiKey { get; set; }
    }
}