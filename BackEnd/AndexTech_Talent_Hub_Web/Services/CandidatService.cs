using AndexTech_Talent_Hub_Web.Repositories;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class CandidatService
    {
        private readonly ICandidatRepository _candidatRepository;

        public CandidatService(ICandidatRepository candidatRepository)
        {
            _candidatRepository = candidatRepository;
        }

        public Task<IEnumerable<Candidat>> GetCandidatsAsync()
        {
            return _candidatRepository.GetCandidatsAsync();
        }

        public Task<Candidat> GetCandidatById(int id)
        {
            return _candidatRepository.GetCandidatByIdAsync(id);
        }

        public Task AddCandidatAsync(Candidat candidat)
        {
            return _candidatRepository.AddCandidatAsync(candidat);
        }

        public Task UpdateCandidatAsync(Candidat candidat)
        {
            return _candidatRepository.UpdateCandidatAsync(candidat);
        }

        public Task DeleteCandidatAsync(int id)
        {
            return _candidatRepository.DeleteCandidatAsync(id);
        }

        public bool CandidatExists(int id)
        {
            return _candidatRepository.CandidatExists(id);
        }

        public Task<List<CandidatQuizStatus>> GetCandidatsWithQuizStatus()
        {
            return _candidatRepository.GetCandidatsWithQuizStatus();
        }
    }
}
