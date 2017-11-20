using System.ComponentModel.DataAnnotations;

namespace TestdataApp.Common.Models.DTO
{
    public class LoginSubmisson
    {
        [Required]
        public string Username { get; set; } 
        [Required]
        public string Password { get; set; }
    }
}