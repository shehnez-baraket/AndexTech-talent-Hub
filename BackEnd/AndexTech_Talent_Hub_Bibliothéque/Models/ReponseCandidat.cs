using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class ReponseCandidat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int ReponseCandidatId { get; set; }
        public int CandidatId { get; set; }
        public List<int> OptionId { get; set; }
        public string ReponseQuestionnaire { get; set; }
        public int QuizId { get; set; }

       /* public static implicit operator ReponseCandidat(List<ReponseCandidat> v)
        {
            throw new NotImplementedException();
        }*/
    }
}
