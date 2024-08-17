using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;

namespace AndexTech_Talent_Hub_Bibliotheque.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionnairesController : ControllerBase
    {
        private IQCMRepository _QCMRepository;
        private readonly AppDbContext _context;

        public QuestionnairesController(AppDbContext context, IQCMRepository qcmRepository)
        {
            _context = context;
            _QCMRepository = qcmRepository;
        }

        // GET: api/Questionnaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Questionnaire>>> GetQuestionnaires()
        {
            return await _context.Questionnaires.ToListAsync();
        }

        // GET: api/Questionnaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Questionnaire>> GetQuestionnaire(int id)
        {
            var questionnaire = await _context.Questionnaires.FindAsync(id);

            if (questionnaire == null)
            {
                return NotFound();
            }

            return questionnaire;
        }

        // POST: api/Questionnaires
        [HttpPost]
        public async Task<ActionResult<Questionnaire>> PostQuestionnaire(Questionnaire questionnaire)
        {
            _context.Questionnaires.Add(questionnaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestionnaire), new { id = questionnaire.QuestionnaireId }, questionnaire);
        }

        // PUT: api/Questionnaires/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestionnaire(int id, Questionnaire questionnaire)
        {
            // Recherchez le questionnaire à mettre à jour dans la base de données
            var existingQuestionnaire = await _context.Questionnaires.FindAsync(id);

            if (existingQuestionnaire == null)
            {
                return NotFound("Questionnaire non trouvé.");
            }

            // Mettez à jour les propriétés de l'entité existante avec les valeurs du questionnaire
            existingQuestionnaire.Enonce = questionnaire.Enonce;
            existingQuestionnaire.ReponseAttendue = questionnaire.ReponseAttendue;
            existingQuestionnaire.NiveauId = questionnaire.NiveauId;
            existingQuestionnaire.Type = questionnaire.Type;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionnaireExists(id))
                {
                    return NotFound("Questionnaire non trouvé.");
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // GET: api/Candidats/Count
        [HttpGet("Count")]
        public async Task<ActionResult<int>> GetTotalQuestionnairesCount()
        {
            try
            {
                var totalCandidatsCount = await _context.Questionnaires.CountAsync();
                return totalCandidatsCount;
            }
            catch (Exception ex)
            {
                // Gérer les exceptions et renvoyer une erreur appropriée
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors du calcul du nombre total de candidats.");
            }
        }
    

        // DELETE: api/Questionnaires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestionnaire(int id)
        {
            var questionnaire = await _context.Questionnaires.FindAsync(id);
            if (questionnaire == null)
            {
                return NotFound();
            }

            _context.Questionnaires.Remove(questionnaire);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionnaireExists(int id)
        {
            return _context.Questionnaires.Any(e => e.QuestionnaireId == id);
        }
    }
}
