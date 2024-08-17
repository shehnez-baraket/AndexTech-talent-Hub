using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Services;
using Azure;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface IReponseService
    {
        Task<ReponseCandidat> GetReponseByCandidatIdAndQuizId(int candidatId, int quizId);

        ReponseCandidat EnregistrerReponseUtilisateur(ReponseCandidat reponse);
        Task<List<VerificationResultat>> VerifierReponses(ReponseCandidat reponseCandidat);      
        Task<int> CalculerScore(ReponseCandidat reponseCandidat);
        Task<List<VerificationResultat>> VerifierReponsesAvecDetails(ReponseCandidat reponseCandidat);
        Task<ReponseCandidat> GetReponseByCandidatId(int candidatId);

    }
}
