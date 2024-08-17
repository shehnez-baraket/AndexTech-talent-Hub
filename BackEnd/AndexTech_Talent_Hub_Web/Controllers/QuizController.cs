using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using AndexTech_Talent_Hub_Web.Services;

namespace VotreNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuizController(AppDbContext context)
        {
            _context = context;
            
        }
        [HttpPost("CreerQuiz")]
        public async Task<ActionResult<Quiz>> GenerateRandomQuiz(CreateQuizRequest request)
        {
            // Récupérer un échantillon aléatoire de QCMs en fonction du niveau et du nombre spécifiés
            var randomQCMs = await _context.QCMs
                .Where(q => q.NiveauId == request.Niveau)
                .OrderBy(q => Guid.NewGuid())
                .Take(request.NombreQCM)
                .ToListAsync();

            // Vérifier si le nombre spécifié de QCMs a été récupéré
            if (randomQCMs.Count != request.NombreQCM)
            {
                return BadRequest("Le nombre spécifié de QCMs n'existe pas.");
            }

            // Récupérer un échantillon aléatoire de questionnaires en fonction du type et du niveau spécifiés
            var randomQuestionnaires = await _context.Questionnaires
                .Where(q => q.Type == request.QuestionnaireType && q.NiveauId == request.QuestionnaireNiveau)
                .OrderBy(q => Guid.NewGuid())
                .Take(request.NombreQuestionnaires)
                .ToListAsync();

            // Vérifier si le nombre spécifié de questionnaires a été récupéré
            if (randomQuestionnaires.Count != request.NombreQuestionnaires)
            {
                return BadRequest("Le nombre spécifié de questionnaires n'existe pas.");
            }

            // Créer un nouveau quiz avec les QCMs et questionnaires récupérés
            var quiz = new Quiz
            {
                NiveauId = request.Niveau,
                Titre = request.Titre,
                Description = request.Description,
                QCMs = randomQCMs,
                Questionnaires = randomQuestionnaires,
                DureeMinutes = request.DureeMinutes,
                DateCreation = DateTime.UtcNow
            };

            _context.Quiz.Add(quiz);
            await _context.SaveChangesAsync();

            return quiz;
        }

        // GET: api/Candidats/Count
        [HttpGet("Count")]
        public async Task<ActionResult<int>> GetTotalQuizsCount()
        {
            try
            {
                var totalCandidatsCount = await _context.Quiz.CountAsync();
                return totalCandidatsCount;
            }
            catch (Exception ex)
            {
                // Gérer les exceptions et renvoyer une erreur appropriée
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors du calcul du nombre total de candidats.");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzes()
        {
            var quizzes = await _context.Quiz
                .Include(q => q.QCMs)
                .Include(q => q.Questionnaires)
                .ToListAsync();

            return quizzes;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Quiz>> GetQuiz(int id)
        {
            var quiz = await _context.Quiz
                .Include(q => q.QCMs)                
                .Include(q => q.Questionnaires)
                .FirstOrDefaultAsync(q => q.QuizId == id);

            if (quiz == null)
            {
                return NotFound();
            }

            return quiz;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Quiz>> DeleteQuiz(int id)
        {
            var quiz = await _context.Quiz
                .Include(q => q.QCMs)
                .Include(q => q.Questionnaires)
                .FirstOrDefaultAsync(q => q.QuizId == id);

            if (quiz == null)
            {
                return NotFound();
            }

            // Supprimer les QCMs associés au quiz
            _context.QCMs.RemoveRange(quiz.QCMs);

            // Supprimer les questionnaires associés au quiz
            _context.Questionnaires.RemoveRange(quiz.Questionnaires);

            // Ensuite, supprimer le quiz lui-même
            _context.Quiz.Remove(quiz);

            // Enregistrer les changements dans la base de données
            await _context.SaveChangesAsync();

            return quiz;
        }
       

        // Endpoint pour mettre à jour un quiz
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuiz(int id, Quiz quiz)
        {
            if (id != quiz.QuizId)
            {
                return BadRequest();
            }

            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
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

        private bool QuizExists(int id)
        {
            return _context.Quiz.Any(e => e.QuizId == id);
        }
       
    }

}
