using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using AndexTech_Talent_Hub_Bibliotheque.Service.Jwt;
using System.Security.Claims;
using AndexTech_Talent_Hub_Web.Repositories;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    //ce contrôleur fournit des endpoints pour créer et utiliser des liens de quiz
    //en générant et en vérifiant des tokens JWT, enregistrant les liens dans la base
    //de données, et en redirigeant les utilisateurs vers la page du quiz appropriée
    public class LienQuizController : ControllerBase
    {
        private readonly ILienQuizRepository _lienQuizRepository;
        private readonly AppDbContext _context;
        private readonly IJwtUtils _jwtUtils;


        public LienQuizController(AppDbContext context, IJwtUtils jwtUtils, ILienQuizRepository lienQuizRepository)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _lienQuizRepository = lienQuizRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LienQuiz>>> GetLiensQuiz()
        {
            var liensQuiz = await _lienQuizRepository.GetAllLienQuiz();

            if (liensQuiz == null)
            {
                return NotFound();
            }

            return Ok(liensQuiz);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<LienQuiz>> GetLienQuizById(int id)
        {
            var lienQuiz = await _lienQuizRepository.GetLienQuizById(id);

            if (lienQuiz == null)
            {
                return NotFound();
            }

            return lienQuiz;
        } 


        [HttpPost("GenerateLink")]
        public async Task<ActionResult<LienQuiz>> CreateLienQuiz(int candidatId, int quizId)
        {
            try
            {
                // Générer un token JWT contenant les informations du candidat et du quiz
                string token = _jwtUtils.GenerateJwtToken(candidatId.ToString(), quizId.ToString(), "AndexTechTalentHubIssuer");

                // Créer un nouvel objet LienQuiz
                var lienQuiz = new LienQuiz
                {
                    CandidateId = candidatId,
                    QuizId = quizId,
                    Token = token,
                    IsOpened = false,
                    IsUsed = false,
                    CreationDate = DateTime.UtcNow
                };

                // Ajouter le lienQuiz à la base de données
                _context.LienQuizs.Add(lienQuiz);
                await _context.SaveChangesAsync();

                return lienQuiz;
            }
            catch (Exception ex)
            {
                // Gérer les erreurs de manière appropriée (par exemple, journalisation, retourner une erreur HTTP)
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLienQuiz(int id)
        {
            var lienQuiz = await _lienQuizRepository.GetLienQuizById(id);

            if (lienQuiz == null)
            {
                return NotFound();
            }

            await _lienQuizRepository.DeleteLienQuiz(id);

            return NoContent();
        } 


        [HttpGet("valider/{token}")]
        public async Task<ActionResult> ValiderLienQuiz(string token)
        {
            try
            {
                // Rechercher le lien correspondant dans la base de données
                var lienQuiz = await _context.LienQuizs.FirstOrDefaultAsync(l => l.Token == token);
               

                // Vérifier si le lien a déjà été utilisé
                if (lienQuiz.IsUsed)
                {
                    return BadRequest("Ce lien a déjà été utilisé");
                }

                // Marquer le lien comme utilisé
                lienQuiz.IsUsed = true;
                lienQuiz.IsOpened = true;
                _context.Entry(lienQuiz).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Gérer les erreurs de manière appropriée (par exemple, journalisation, retourner une erreur HTTP)
                return BadRequest(ex.Message);
            }
        }

    }
}
