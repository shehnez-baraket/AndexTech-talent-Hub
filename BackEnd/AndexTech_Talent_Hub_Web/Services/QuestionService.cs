using System.Collections.Generic;
using System.Threading.Tasks;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class QuestionService
    {
        private readonly IQuestionRepository _questionRepository;

        public QuestionService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync()
        {
            return await _questionRepository.GetQuestionsAsync();
        }

        public async Task<Question> GetQuestionByIdAsync(int id)
        {
            return await _questionRepository.GetQuestionByIdAsync(id);
        }

        public async Task AddQuestionAsync(Question question)
        {
            await _questionRepository.AddQuestionAsync(question);
        }

        public async Task UpdateQuestionAsync(Question question)
        {
            await _questionRepository.UpdateQuestionAsync(question);
        }

        public async Task DeleteQuestionAsync(int id)
        {
            await _questionRepository.DeleteQuestionAsync(id);
        }

        public bool QuestionExists(int id)
        {
            return _questionRepository.QuestionExists(id);
        }
    }
}
