
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class QCM
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int QCMId { get; set; }
        public string Titre { get; set; }
        public string Description { get; set; }
        public int NombreQuestions { get; set; }
        public int NiveauId { get; set; }


    }

}
