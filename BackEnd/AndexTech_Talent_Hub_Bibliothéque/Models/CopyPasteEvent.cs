using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class CopyPasteEvent
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CopyPasteEventId { get; set; }
        public string Action { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
        public int CandidatId { get; set; }
        public int QuizId { get; set; }
    }
}
