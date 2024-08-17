using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class ScoreService : IScoreService
    {
        private readonly AppDbContext _context;

        public ScoreService(AppDbContext context)
        {
            _context = context;
        }

        public async Task EnregistrerScore(ReponseCandidat reponse,int score)
        {
            var resultat = new ResultatQuiz
            {
                CandidatId = reponse.CandidatId,
                DateSoumission = DateTime.Now, // Vous pouvez ajuster cette valeur selon vos besoins
                Score = score,
                QuizId = reponse.QuizId
            };

            _context.ResultatsQuiz.Add(resultat);
            await _context.SaveChangesAsync();
        }
    }

}
