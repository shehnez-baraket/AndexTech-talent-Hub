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
    public class TabTrackingController : ControllerBase
    {
        private readonly TabTrackingService _tabTrackingService;

        public TabTrackingController(TabTrackingService tabTrackingService)
        {
            _tabTrackingService = tabTrackingService ?? throw new ArgumentNullException(nameof(tabTrackingService));
        }

        [HttpPost]
        public async Task<IActionResult> AddTabTracking(TabTracking tabTracking)
        {
            await _tabTrackingService.AddTabTracking(tabTracking);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<TabTracking>>> GetAllTabTracking()
        {
            return await _tabTrackingService.GetAllTabTracking();
        }

        [HttpGet("{candidateId}")]
        public async Task<ActionResult<List<TabTracking>>> GetTabTrackingByCandidateId(int candidateId)
        {
            var tabTracking = await _tabTrackingService.GetTabTrackingByCandidateId(candidateId);
            if (tabTracking == null)
            {
                return NotFound();
            }
            return tabTracking;
        }
        [HttpGet("{candidateId}/quiz/{quizId}")]
        public async Task<ActionResult<List<TabTracking>>> GetTabTrackingByCandidateIdAndQuizId(int candidateId, int quizId)
        {
            var tabTracking = await _tabTrackingService.GetTabTrackingByCandidateIdAndQuizId(candidateId, quizId);
            if (tabTracking == null)
            {
                return NotFound();
            }
            return tabTracking;
        }
    
}
}
