using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    // les options ou choix pour chaque question
    public class Option
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OptionId { get; set; }
        public string Texte { get; set; }
        public bool EstCorrect { get; set; }
        public int QuestionId { get; set; }

    }

}
