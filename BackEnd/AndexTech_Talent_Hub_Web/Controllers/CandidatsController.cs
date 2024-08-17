using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;
using AndexTech_Talent_Hub_Web.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatsController : ControllerBase
    {
        private readonly IQuizService _quizService;
        private readonly CandidatService _candidatService;

        public CandidatsController(CandidatService candidatService, IQuizService quizService)
        {
            _candidatService = candidatService;
            _quizService = quizService;
        }
        [HttpGet("{id}/quizzes")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByCandidat(int id)
        {
            var quizzes = await _quizService.GetQuizzesByCandidatId(id);
            return Ok(quizzes);
        }

        [HttpGet("GetCandidatsWithQuizStatus")]
        public async Task<ActionResult<List<CandidatQuizStatus>>> GetCandidatsWithQuizStatus()
        {
            var candidatsWithStatus = await _candidatService.GetCandidatsWithQuizStatus();
            return Ok(candidatsWithStatus);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Candidat>>> GetCandidats()
        {
            var candidats = await _candidatService.GetCandidatsAsync();
            return Ok(candidats);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Candidat>> GetCandidat(int id)
        {
            var candidat = await _candidatService.GetCandidatById(id);

            if (candidat == null)
            {
                return NotFound();
            }

            return Ok(candidat);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCandidat(int id, Candidat candidat)
        {
            if (id != candidat.Id)
            {
                return BadRequest("L'ID du candidat ne correspond pas.");
            }

            if (!_candidatService.CandidatExists(id))
            {
                return NotFound("Candidat non trouvé.");
            }

            await _candidatService.UpdateCandidatAsync(candidat);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCandidat(int id)
        {
            if (!_candidatService.CandidatExists(id))
            {
                return NotFound();
            }

            await _candidatService.DeleteCandidatAsync(id);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Candidat>> PostCandidat(Candidat candidat)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _candidatService.AddCandidatAsync(candidat);
            return CreatedAtAction(nameof(GetCandidat), new { id = candidat.Id }, candidat);
        }

        [HttpGet("Count")]
        public async Task<ActionResult<int>> GetTotalCandidatsCount()
        {
            var candidats = await _candidatService.GetCandidatsAsync();
            return Ok(candidats.Count());
        }
    }
}
