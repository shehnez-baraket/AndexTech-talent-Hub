using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class CopyPasteEventService
    {
        private readonly AppDbContext _context;

        public CopyPasteEventService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<CopyPasteEvent>> GetCopyPasteEventsByCandidateIdAndQuizId(int candidateId, int quizId)
        {
            return await _context.CopyPasteEvent
                                 .Where(e => e.CandidatId == candidateId && e.QuizId == quizId)
                                 .ToListAsync();
        }

        public async Task AddCopyPasteEvent(CopyPasteEvent copyPasteEvent)
        {
            _context.CopyPasteEvent.Add(copyPasteEvent);
            await _context.SaveChangesAsync();
        }

        public async Task<List<CopyPasteEvent>> GetAllCopyPasteEvents()
        {
            return await _context.CopyPasteEvent.ToListAsync();
        }

        public async Task<List<CopyPasteEvent>> GetCopyPasteEventsByCandidateId(int candidateId)
        {
            return await _context.CopyPasteEvent
                .Where(e => e.CandidatId == candidateId)
                .ToListAsync();
        }
    }
}
