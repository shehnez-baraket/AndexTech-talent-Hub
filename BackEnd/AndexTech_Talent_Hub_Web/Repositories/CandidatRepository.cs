using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public class CandidatRepository : ICandidatRepository
    {
        private readonly AppDbContext _dbContext;

        public CandidatRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Candidat>> GetCandidatsAsync()
        {
            return await _dbContext.Candidats.ToListAsync();
        }

        public async Task<Candidat> GetCandidatByIdAsync(int id)
        {
            return await _dbContext.Candidats.FindAsync(id);
        }

        public async Task AddCandidatAsync(Candidat candidat)
        {
            _dbContext.Candidats.Add(candidat);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCandidatAsync(Candidat candidat)
        {
            _dbContext.Entry(candidat).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCandidatAsync(int id)
        {
            var candidat = await _dbContext.Candidats.FindAsync(id);
            if (candidat != null)
            {
                _dbContext.Candidats.Remove(candidat);
                await _dbContext.SaveChangesAsync();
            }
        }

        public bool CandidatExists(int id)
        {
            return _dbContext.Candidats.Any(e => e.Id == id);
        }

        public async Task<List<CandidatQuizStatus>> GetCandidatsWithQuizStatus()
        {
            return await _dbContext.Candidats
                .GroupJoin(
                    _dbContext.LienQuizs,
                    candidat => candidat.Id,
                    lienQuiz => lienQuiz.CandidateId,
                    (candidat, liensQuiz) => new CandidatQuizStatus
                    {
                        Id = candidat.Id,
                        Nom = candidat.Nom,
                        Prenom = candidat.Prenom,
                        AdresseEmail = candidat.AdresseEmail,
                        HasPassedQuiz = liensQuiz.Any(lq => lq.IsUsed)
                    }
                ).ToListAsync();
        }
    }

    public class CandidatQuizStatus
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string AdresseEmail { get; set; }
        public bool HasPassedQuiz { get; set; }
    }
}
