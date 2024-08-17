using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CopyPasteEventController : ControllerBase
    {
        private readonly CopyPasteEventService _copyPasteEventService;

        public CopyPasteEventController(CopyPasteEventService copyPasteEventService)
        {
            _copyPasteEventService = copyPasteEventService ?? throw new ArgumentNullException(nameof(copyPasteEventService));
        }

        [HttpPost]
        public async Task<IActionResult> AddCopyPasteEvent(CopyPasteEvent copyPasteEvent)
        {
            await _copyPasteEventService.AddCopyPasteEvent(copyPasteEvent);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<CopyPasteEvent>>> GetAllCopyPasteEvents()
        {
            return await _copyPasteEventService.GetAllCopyPasteEvents();
        }

        [HttpGet("{candidateId}")]
        public async Task<ActionResult<List<CopyPasteEvent>>> GetCopyPasteEventsByCandidateId(int candidateId)
        {
            var copyPasteEvents = await _copyPasteEventService.GetCopyPasteEventsByCandidateId(candidateId);
            if (copyPasteEvents == null)
            {
                return NotFound();
            }
            return copyPasteEvents;
        }
        [HttpGet("{candidateId}/quiz/{quizId}")]
        public async Task<ActionResult<List<CopyPasteEvent>>> GetCopyPasteEventsByCandidateIdAndQuizId(int candidateId, int quizId)
        {
            var copyPasteEvents = await _copyPasteEventService.GetCopyPasteEventsByCandidateIdAndQuizId(candidateId, quizId);
            if (copyPasteEvents == null)
            {
                return NotFound();
            }
            return copyPasteEvents;
        }
    }
}
