using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public class QCMRepository : IQCMRepository
    {
        private readonly AppDbContext _context;
        public async Task<int> GetTotalQuestionnairesCountAsync()
        {
            return await _context.Questionnaires.CountAsync();
        }
        public QCMRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<QCM> GetAll()
        {
            return _context.QCMs.ToList();
        }

        public QCM GetById(int id)
        {
            return _context.QCMs.FirstOrDefault(q => q.QCMId == id);
        }

        public async Task<QCM> CreateQCMWithQuestionsAndChoices(QCM qcm)
        {
            _context.QCMs.Add(qcm);
            await _context.SaveChangesAsync();
            return qcm;
        }

        public async Task Update(QCM qcm)
        {
            _context.Entry(qcm).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var qcm = await _context.QCMs.FindAsync(id);
            if (qcm != null)
            {
                _context.QCMs.Remove(qcm);
                await _context.SaveChangesAsync();
            }
        }
    }
}
