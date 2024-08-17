using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class Question
    {
        // une question a plusieurs options ou choix
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionId { get; set; }
        public string Texte { get; set; }
        public int Point { get; set; }
        public int NiveauId { get; set; }
        public string Domaine { get; set; }
        public List<Option> Option { get; set; }

    }

}
