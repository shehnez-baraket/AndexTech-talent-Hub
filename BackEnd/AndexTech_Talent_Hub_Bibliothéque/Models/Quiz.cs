using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class Quiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QuizId { get; set; }
        public string Titre { get; set; }
        public int DureeMinutes { get; set; }
        public DateTime DateCreation { get; set;}
        public string Description { get; set; }
        public List<QCM> QCMs { get; set; }
        public List<Questionnaire> Questionnaires { get; set; }
        public int NiveauId { get; set; }


    }

}
