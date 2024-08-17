using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class Questionnaire
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuestionnaireId { get; set; }
        public string Enonce { get; set; }
        public string ReponseAttendue { get; set; }
        public int Point { get;set; }
        public int NiveauId { get; set; }
        public string Type { get; set; } // Par exemple, "C#", "JavaScript", "SQL", etc.

    }

}
