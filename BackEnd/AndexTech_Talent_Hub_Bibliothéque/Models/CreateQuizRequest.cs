using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Models
{
    public class CreateQuizRequest
    {
        

        public string Titre { get; set; }
        public int Niveau { get; set; }
        public int NombreQCM { get; set; }
        public int QuestionnaireNiveau { get; set; }
        public int NombreQuestionnaires { get; set; }
        public int DureeMinutes { get; set; }
        public string Description { get; set; }
        public string QuestionnaireType { get; set; }
    }
}
