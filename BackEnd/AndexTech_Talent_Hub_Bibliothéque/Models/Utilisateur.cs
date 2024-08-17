using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    // Par utilisateur on voulais dire Admin
    public class Utilisateur : IdentityUser<int>
    {
        [Required]
        public string Nom { get; set; }

        [Required]
        public string Prenom { get; set; }

        [Required]
        [EmailAddress]
        public override string Email { get; set; }

    }
}
