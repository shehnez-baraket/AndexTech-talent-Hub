using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Candidat")]
        public int CandidatId { get; set; }

        [Required]
        public string Avis { get; set; }

        [Required]
        public DateTime DateFeedback { get; set; }

    }
}