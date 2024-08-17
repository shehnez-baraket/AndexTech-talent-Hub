using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace VotreNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QCMQuestionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QCMQuestionController(AppDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<QCMQuestion>>> GetQCMQuestions()
        {
            var qcmQuestions = await _context.QCMQuestion
                .Include(q => q.QCM)
                .Include(q => q.Question)
                .Include (q=> q.Question)
                    .ThenInclude(question => question.Option)
                .ToListAsync();

            return qcmQuestions;
        }
    }
}
