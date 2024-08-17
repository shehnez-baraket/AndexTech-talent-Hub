using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class QuizService : IQuizService
    {
        private readonly AppDbContext _context;

        public QuizService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCandidatId(int candidatId)
        {
            var lienQuizzes = await _context.LienQuizs
                                             .Where(lq => lq.CandidateId == candidatId)
                                             .Include(lq => lq.Quiz)
                                             .ToListAsync();
            return lienQuizzes.Select(lq => lq.Quiz);
        }
    }
}