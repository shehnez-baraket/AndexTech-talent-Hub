using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public class LienQuizRepository : ILienQuizRepository
    {
        private readonly AppDbContext _context;

        public LienQuizRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<LienQuiz>> GetAllLienQuiz()
        {
            return await _context.LienQuizs.ToListAsync();
        }


        public async Task<LienQuiz> GetLienQuizById(int lienQuizId)
        {
            return await _context.LienQuizs.FindAsync(lienQuizId);
        }

        public async Task<List<LienQuiz>> GetLienQuizByCandidateId(int candidateId)
        {
            return await _context.LienQuizs
                .Where(lq => lq.CandidateId == candidateId)
                .ToListAsync();
        }

        public async Task<List<LienQuiz>> GetLienQuizByEmailAsync(string email)
        {
            return await _context.LienQuizs
                .Where(lq => lq.Candidate.AdresseEmail == email)
                .ToListAsync();
        }



        /* return await _context.LienQuizs
             .Where(lq => lq.Candidate.AdresseEmail == email)
             .ToListAsync();*/


        public async Task AddLienQuiz(LienQuiz lienQuiz)
        {
            _context.LienQuizs.Add(lienQuiz);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLienQuiz(LienQuiz lienQuiz)
        {
            _context.Entry(lienQuiz).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteLienQuiz(int lienQuizId)
        {
            var lienQuiz = await _context.LienQuizs.FindAsync(lienQuizId);
            if (lienQuiz != null)
            {
                _context.LienQuizs.Remove(lienQuiz);
                await _context.SaveChangesAsync();
            }
        }


    }
}
