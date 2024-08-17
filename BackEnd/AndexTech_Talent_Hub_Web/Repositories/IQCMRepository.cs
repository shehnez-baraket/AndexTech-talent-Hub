using AndexTech_Talent_Hub_Bibliotheque.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface IQCMRepository
    {

        Task<int> GetTotalQuestionnairesCountAsync();

        IEnumerable<QCM> GetAll();
        QCM GetById(int id);
        Task<QCM> CreateQCMWithQuestionsAndChoices(QCM qcm);
        Task Update(QCM qcm);
        Task Delete(int id);
    }
}
