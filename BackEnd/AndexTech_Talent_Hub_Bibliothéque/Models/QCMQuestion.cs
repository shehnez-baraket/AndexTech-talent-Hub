using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class QCMQuestion
    {
        // Table d'association qui lie les QCMs et les Questions, il s'agit d'une relation Many-to-Many
        [Key]

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int QCMQuestionId { get; set; } 
        [ForeignKey("QCMId")]
        public int QCMId { get; set; }

       
        public QCM QCM { get; set; }
  [ForeignKey("QuestionId")]
        public int QuestionId { get; set; }

      
        public Question Question { get; set; }
    }
}
