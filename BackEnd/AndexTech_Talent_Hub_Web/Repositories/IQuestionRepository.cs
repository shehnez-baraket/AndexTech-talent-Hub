
using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface IQuestionRepository
    {

        Task<int> GetTotalQuestionsCountAsync();
        Task<IEnumerable<Question>> GetQuestionsAsync();
        Task<Question> GetQuestionByIdAsync(int id);
        Task AddQuestionAsync(Question question);
        Task UpdateQuestionAsync(Question question);
        Task DeleteQuestionAsync(int id);
        bool QuestionExists(int id);
        Task<IEnumerable<Option>> GetOptionsForQuestionAsync(int id);

    }
}
