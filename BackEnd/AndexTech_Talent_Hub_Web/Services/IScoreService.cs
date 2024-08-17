using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Services
{
    public interface IScoreService
    {
        Task EnregistrerScore(ReponseCandidat reponse, int score);

    }
}
