using AndexTech_Talent_Hub_Bibliotheque.Models;


namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface ICandidatRepository
    {
        Task<IEnumerable<Candidat>> GetCandidatsAsync();
        Task<Candidat> GetCandidatByIdAsync(int id);
        Task AddCandidatAsync(Candidat candidat);
        Task UpdateCandidatAsync(Candidat candidat);
        Task DeleteCandidatAsync(int id);
        bool CandidatExists(int id);
        Task<List<CandidatQuizStatus>> GetCandidatsWithQuizStatus();

    }
}
