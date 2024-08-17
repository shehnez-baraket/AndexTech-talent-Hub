using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{

    // Générer les Liens de tests en se basant sur les QuizId et CandidatId
    public class LienQuiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LienQuizId { get; set; }

        [Required]
        [ForeignKey("Candidate")]
        public int CandidateId { get; set; }
        public Candidat Candidate { get; set; }

        [Required]
        [ForeignKey("Quiz")]
        public int QuizId { get; set; }
        public Quiz Quiz { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        public bool IsOpened { get; set; }

        [Required]
        public bool IsUsed { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }

        public string lienAcces;
    }
}
