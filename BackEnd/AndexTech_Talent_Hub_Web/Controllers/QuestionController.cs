using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;
using Microsoft.EntityFrameworkCore;
using AndexTech_Talent_Hub_Bibliotheque.Data;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly AppDbContext _dbContext;

        public QuestionController(IQuestionRepository questionRepository, AppDbContext dbContext)
        {
            _questionRepository = questionRepository;
            _dbContext = dbContext;

        }
        // GET: api/Question/Count
        [HttpGet("Count")]
        public async Task<ActionResult<int>> GetTotalQuestionsCount()
        {
            try
            {
                var totalQuestionsCount = await _questionRepository.GetTotalQuestionsCountAsync();
                return totalQuestionsCount;
            }
            catch (Exception ex)
            {
                // Gérer les exceptions et renvoyer une erreur appropriée
                return StatusCode(StatusCodes.Status500InternalServerError, "Une erreur s'est produite lors du calcul du nombre total de questions.");
            }
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _dbContext.Questions.ToListAsync();
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var question = await _dbContext.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // POST: api/Question
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            await _questionRepository.AddQuestionAsync(question);
            return CreatedAtAction(nameof(GetQuestion), new { id = question.QuestionId }, question);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {

            var existingQuestion = await _dbContext.Questions
                .Include(q => q.Option)
                .FirstOrDefaultAsync(q => q.QuestionId == id);

            if (existingQuestion == null)
            {
                return NotFound("Question non trouvée.");
            }

            // Log les données reçues
            Console.WriteLine($"Received Question ID: {question.QuestionId}");
            Console.WriteLine($"Received Question Text: {question.Texte}");
            Console.WriteLine($"Received Question Level ID: {question.NiveauId}");
            Console.WriteLine($"Received Question Domain: {question.Domaine}");
            foreach (var option in question.Option)
            {
                Console.WriteLine($"Received Option Text: {option.Texte}, Is Correct: {option.EstCorrect}");
            }

            // Mettre à jour les propriétés de la question existante
            existingQuestion.Texte = question.Texte;
            existingQuestion.NiveauId = question.NiveauId;
            existingQuestion.Domaine = question.Domaine;

            // Mettre à jour les options
            _dbContext.Option.RemoveRange(existingQuestion.Option);

            foreach (var option in question.Option)
            {
                existingQuestion.Option.Add(new Option
                {
                    Texte = option.Texte,
                    EstCorrect = option.EstCorrect,
                    QuestionId = existingQuestion.QuestionId
                });
            }

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound("Question non trouvée.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return _dbContext.Questions.Any(q => q.QuestionId == id);
        }


        //DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (!_questionRepository.QuestionExists(id))
            {
                return NotFound();
            }
            await _questionRepository.DeleteQuestionAsync(id);
            return NoContent();
        }

        // GET: api/Question/{questionId}/Options
        [HttpGet("{questionId}/Options")]
        public async Task<ActionResult<IEnumerable<Option>>> GetOptionsForQuestion(int questionId)
        {
            var question = await _questionRepository.GetQuestionByIdAsync(questionId);
            if (question == null)
            {
                return NotFound("Question not found");
            }

            // Utilisez la méthode de votre repository pour récupérer les options de la question
            var options = await _questionRepository.GetOptionsForQuestionAsync(questionId);

            return options.ToList();
        }

    }



}
