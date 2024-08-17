using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class ActivityService : IActivityService
    {
        private readonly AppDbContext _context;

        public ActivityService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CopyPasteEvent>> GetCopyPasteActivities(int candidatId)
        {
            return await _context.CopyPasteEvent
                .Where(a => a.CandidatId == candidatId )
                .ToListAsync();
        }
       

        public async Task<List<TabTracking>> GetTabTrackingActivities(int candidatId)
        {
            return await _context.TabTracking
                .Where(a => a.CandidatId == candidatId)
                .ToListAsync();
        }
        public async Task<List<CopyPasteEvent>> GetCopyPasteActivitiesByCandidateIdAndQuizId(int candidatId, int quizId)
        {
            return await _context.CopyPasteEvent
                .Where(a => a.CandidatId == candidatId && a.QuizId == quizId)
                .ToListAsync();
        }

        public async Task<List<TabTracking>> GetTabTrackingActivitiesByCandidateIdAndQuizId(int candidatId, int quizId)
        {
            return await _context.TabTracking
                .Where(a => a.CandidatId == candidatId && a.QuizId == quizId)
                .ToListAsync();
        }
    }
}