using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class AvisClient
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime SubmittedAt { get; set; }
        public int CandidatId { get; set; } // Assuming you have a Candidat entity
    }

}
