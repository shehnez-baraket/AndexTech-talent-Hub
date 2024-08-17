using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvisClientController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AvisClientController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SubmitAvis([FromBody] AvisClient avis)
        {
            if (avis == null || avis.Rating == 0 || string.IsNullOrEmpty(avis.Comment))
            {
                return BadRequest("Rating and comment are required");
            }

            avis.SubmittedAt = DateTime.UtcNow;
            _context.AvisClient.Add(avis);
            await _context.SaveChangesAsync();

            return Ok(avis);
        }

        [HttpGet]
        public async Task<IActionResult> GetAvis()
        {
            var feedbacks = await _context.AvisClient.ToListAsync();
            return Ok(feedbacks);
        }
        [HttpGet("countByStars")]
        public async Task<IActionResult> GetAvisCountByStars()
        {
            var avisCounts = await _context.AvisClient
                .GroupBy(a => a.Rating)
                .Select(group => new { Stars = group.Key, Count = group.Count() })
                .ToListAsync();

            // Créer un tableau d'objets JSON avec les propriétés name et value
            var formattedResult = avisCounts.Select(ac => new { name = ac.Stars, value = ac.Count });

            return Ok(formattedResult);
        }

    }
}