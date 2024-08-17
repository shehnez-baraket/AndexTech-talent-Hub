using System.ComponentModel.DataAnnotations;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class Niveau
    {
        [Key]
        public int NiveauId { get; set; }

        public string Nom { get; set; }
    }
}
