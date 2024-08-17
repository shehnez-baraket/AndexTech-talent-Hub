using System.Collections.Generic;
using System.Threading.Tasks;
using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface ILienQuizRepository
    {

        Task<LienQuiz> GetLienQuizById(int lienQuizId);
        Task<List<LienQuiz>> GetLienQuizByCandidateId(int candidateId);
        Task AddLienQuiz(LienQuiz lienQuiz);
        Task UpdateLienQuiz(LienQuiz lienQuiz);
        Task DeleteLienQuiz(int lienQuizId);
        Task<List<LienQuiz>> GetLienQuizByEmailAsync(string email);
        Task<List<LienQuiz>> GetAllLienQuiz();
    }
    
}
