using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Services
{
    public interface IActivityService
    {
        
            Task<List<CopyPasteEvent>> GetCopyPasteActivities(int candidateId);
            Task<List<CopyPasteEvent>> GetCopyPasteActivitiesByCandidateIdAndQuizId(int candidateId, int quizId);
            Task<List<TabTracking>> GetTabTrackingActivities(int candidateId);
            Task<List<TabTracking>> GetTabTrackingActivitiesByCandidateIdAndQuizId(int candidateId, int quizId);
        

    }
}
