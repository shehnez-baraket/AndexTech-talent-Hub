using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Services
{
    public interface IQuizService
    {
        Task<IEnumerable<Quiz>> GetQuizzesByCandidatId(int candidatId);
    }
}
