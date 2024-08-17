using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class ResultatQuiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ResultatQuizId { get; set; }

        // Clé étrangère vers le candidat
        public int CandidatId { get; set; }
        public Candidat Candidat { get; set; }
        // Liste des réponses fournies par le candidat
        public List<ReponseCandidat> ReponsesCandidat { get; set; }

        // Date et heure de soumission du quiz
        public DateTime DateSoumission { get; set; }

        // Score obtenu par le candidat
        public int Score { get; set; }
        public int QuizId { get; set; }
    }
}
