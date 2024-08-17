using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;


using AndexTech_Talent_Hub_Web.Repositories;
using Microsoft.EntityFrameworkCore;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly AppDbContext _context;


        public async Task<int> GetTotalQuestionsCountAsync()
        {
            return await _context.Questions.CountAsync();
        }
        public QuestionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Question>> GetQuestionsAsync()
        {
            return await _context.Questions.Include(q => q.Option).ToListAsync();
        }

        public async Task<Question> GetQuestionByIdAsync(int id)
        {
            return await _context.Questions.FindAsync(id);
        }

        public async Task AddQuestionAsync(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateQuestionAsync(Question question)
        {
            _context.Entry(question).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestionAsync(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
            }
        }

        public bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionId == id);
        }

        public async Task<IEnumerable<Option>> GetOptionsForQuestionAsync(int questionId)
        {
            // Récupérez les options de la question spécifique en utilisant l'ID de la question
            return await _context.Option
                                 .Where(o => o.QuestionId == questionId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Question>> GetQuestionsForOptions(List<int> optionIds)
        {
            // Récupérer les questions associées aux options spécifiées
            return await _context.Questions
                .Include(q => q.Option)
                .Where(q => q.Option.Any(o => optionIds.Contains(o.OptionId)))
                .ToListAsync();
        }

    }
}
