using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Services;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QCMController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly QCMService _qcmService;

        public QCMController(AppDbContext context, QCMService qcmService)
        {
            _context = context;
            _qcmService = qcmService;
        }

        /* [HttpPost]
         public async Task<ActionResult<QCM>> CreateQCM(QCM qcm)
         {
             // Récupérer aléatoirement les questions en fonction du nombre spécifié et du niveau demandé
             var randomQuestions = _qcmService.GetRandomQuestions(qcm.NombreQuestions, qcm.NiveauId);

             // Ajouter les questions au QCM
             foreach (var question in randomQuestions)
             {
                 var qcmQuestion = new QCMQuestion
                 {
                     QCM = qcm,
                     Question = question
                 };

                 _context.QCMQuestion.Add(qcmQuestion);
             }

             // Enregistrer les changements dans la base de données
             await _context.SaveChangesAsync();

             return Ok(new { message = "QCM créé avec succès.", qcmId = qcm.QCMId });
         }*/
        [HttpPost]
        public async Task<ActionResult<QCM>> CreateQCM(QCM qcm)
        {
            // Ajouter le QCM à la base de données pour générer son QCMId
            _context.QCMs.Add(qcm);
            await _context.SaveChangesAsync();

            // Récupérer aléatoirement les questions en fonction du nombre spécifié et du niveau demandé
            var randomQuestions = _qcmService.GetRandomQuestions(qcm.NombreQuestions, qcm.NiveauId);

            // Ajouter les questions au QCM
            foreach (var question in randomQuestions)
            {
                var qcmQuestion = new QCMQuestion
                {
                    QCMId = qcm.QCMId,
                    QuestionId = question.QuestionId
                };

                _context.QCMQuestion.Add(qcmQuestion);
            }

            // Enregistrer les changements dans la base de données
            await _context.SaveChangesAsync();

            return Ok(new { message = "QCM créé avec succès.", qcmId = qcm.QCMId });
        }

        // GET: api/QCM
        [HttpGet]
         public async Task<ActionResult<IEnumerable<QCM>>> GetQCMs()
         {
             return await _context.QCMs.ToListAsync();
         }


        // GET: api/QCM/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QCM>> GetQCM(int id)
        {
            var qcm = await _context.QCMs.FindAsync(id);

            if (qcm == null)
            {
                return NotFound();
            }

            return qcm;
        }

     
        // PUT: api/QCM/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQCM(int id, QCM qcm)
        {
            if (id != qcm.QCMId)
            {
                return BadRequest();
            }

            _context.Entry(qcm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QCMExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/QCM/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQCM(int id)
        {
            var qcm = await _context.QCMs.FindAsync(id);
            if (qcm == null)
            {
                return NotFound();
            }

            _context.QCMs.Remove(qcm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QCMExists(int id)
        {
            return _context.QCMs.Any(e => e.QCMId == id);
        }

        // GET: api/QCM/Count
        [HttpGet("Count")]
        public async Task<ActionResult<int>> GetTotalQCMsCount()
        {
            try
            {
                var totalQCMsCount = await _context.QCMs.CountAsync();
                return totalQCMsCount;
            }
            catch (Exception ex)
            {
                // Gérer les exceptions et renvoyer une erreur appropriée
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors du calcul du nombre total de QCMs.");
            }
        }
        // GET: api/QCM/QuestionsAndOptions/{qcmId}
        [HttpGet("QuestionsAndOptions/{qcmId}")]
        public async Task<ActionResult<IEnumerable<QCMQuestion>>> GetQCMQuestionsAndOptions(int qcmId)
        {
            var qcmQuestions = await _context.QCMQuestion
                .Include(qcq => qcq.Question)
                    .ThenInclude(q => q.Option)
                .Where(qcq => qcq.QCMId == qcmId)
                .ToListAsync();

            if (qcmQuestions == null)
            {
                return NotFound();
            }

            return qcmQuestions;
        }

    }

}
