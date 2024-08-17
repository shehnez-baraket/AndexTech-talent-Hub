using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class TabTrackingService
    {
        private readonly AppDbContext _context;

        public TabTrackingService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TabTracking>> GetTabTrackingByCandidateIdAndQuizId(int candidateId, int quizId)
        {
            return await _context.TabTracking
                                 .Where(t => t.CandidatId == candidateId && t.QuizId == quizId)
                                 .ToListAsync();
        }
        public async Task AddTabTracking(TabTracking tabTracking)
        {
            _context.TabTracking.Add(tabTracking);
            await _context.SaveChangesAsync();
        }

        public async Task<List<TabTracking>> GetAllTabTracking()
        {
            return await _context.TabTracking.ToListAsync();
        }

        public async Task<List<TabTracking>> GetTabTrackingByCandidateId(int candidateId)
        {
            return await _context.TabTracking
                .Where(t => t.CandidatId == candidateId)
                .ToListAsync();
        }
    }
}
