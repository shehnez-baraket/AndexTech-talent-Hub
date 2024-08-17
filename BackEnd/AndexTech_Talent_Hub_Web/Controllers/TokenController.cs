using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Web.Repositories;
using AndexTech_Talent_Hub_Web.Services;
using System.Linq;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        private readonly ILienQuizRepository _lienQuizRepository;
        private readonly EmailService _emailService;

        public TokenController(ILienQuizRepository lienQuizRepository, EmailService emailService)
        {
            _lienQuizRepository = lienQuizRepository;
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> EnvoiEmail(string email)
        {
            var liensQuiz = await _lienQuizRepository.GetLienQuizByEmailAsync(email);

            if (liensQuiz == null)
            {
                return StatusCode(500, "Une erreur s'est produite lors de la recherche des liens de quiz.");
            }

            if (!liensQuiz.Any())
            {
                return NotFound("Aucun lien de quiz trouvé pour cette adresse e-mail");
            }

            var subject = "Lien d'accès à votre test";
            foreach (var lienQuiz in liensQuiz)
            {
                var message = $"Bonjour,\n\nVoici votre lien d'accès au test : http://localhost:4200/accueil/{lienQuiz.Token}\n\n\nCordialement,\n\nVotre équipe de recrutement";
                var senderName = "Andex International";

                try
                {
                    await _emailService.SendEmailAsync(email, subject, message, senderName);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new EmailResponse { Message = ex.Message, IsSuccess = false });
                }
            }

            return Ok(new EmailResponse { Message = "Lien d'accès envoyé avec succès", IsSuccess = true });
        }
    }

    public class EmailResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
    }
}
