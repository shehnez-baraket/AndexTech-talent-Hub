using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Web.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class ReponseService : IReponseService
    {
        private readonly QuestionRepository _questionRepository;
        private readonly AppDbContext _context;

        public ReponseService(AppDbContext context, QuestionRepository questionRepository)
        {
            _context = context;
            _questionRepository = questionRepository;
        }

        public async Task<ReponseCandidat> GetReponseByCandidatIdAndQuizId(int candidatId, int quizId)
        {
            return await _context.ReponseCandidats
                                 .FirstOrDefaultAsync(r => r.CandidatId == candidatId && r.QuizId == quizId);
        }

        public async Task<List<VerificationResultat>> VerifierReponsesAvecDetails(ReponseCandidat reponseCandidat)
        {
            List<VerificationResultat> resultats = new List<VerificationResultat>();

            // Récupérer les questions associées aux options choisies par le candidat
            IEnumerable<Question> questions = await _questionRepository.GetQuestionsForOptions(reponseCandidat.OptionId);

            // Vérifier les réponses du candidat
            foreach (var question in questions)
            {
                var optionsCorrectes = question.Option.Where(o => o.EstCorrect).Select(o => o.OptionId).ToList();
                var optionsChoisies = reponseCandidat.OptionId.Where(id => question.Option.Any(o => o.OptionId == id)).ToList();

                // Debug logs
                Console.WriteLine($"Question: {question.Texte}");
                Console.WriteLine($"Options Correctes: {string.Join(", ", optionsCorrectes)}");
                Console.WriteLine($"Options Choisies: {string.Join(", ", optionsChoisies)}");

                bool estCorrecte = !optionsCorrectes.Except(optionsChoisies).Any() &&
                                   !optionsChoisies.Except(optionsCorrectes).Any();

                string choixCandidat = string.Join(", ", question.Option.Where(o => optionsChoisies.Contains(o.OptionId)).Select(o => o.Texte));
                string reponseCorrecte = string.Join(", ", question.Option.Where(o => o.EstCorrect).Select(o => o.Texte));

                resultats.Add(new VerificationResultat
                {
                    Question = question,
                    ChoixCandidat = choixCandidat,
                    ReponseCorrecte = reponseCorrecte,
                    EstCorrect = estCorrecte,
                    Points = estCorrecte ? question.Point : 0
                });
            }

            return resultats;
        }


        public async Task<List<VerificationResultat>> VerifierReponses(ReponseCandidat reponseCandidat)
        {
            List<VerificationResultat> resultats = new List<VerificationResultat>();

            // Récupérer les questions associées aux options choisies par le candidat
            IEnumerable<Question> questions = await _questionRepository.GetQuestionsForOptions(reponseCandidat.OptionId);

            // Vérifier les réponses du candidat
            foreach (var question in questions)
            {
                // Trouver toutes les options correctes pour cette question
                var optionsCorrectes = question.Option.Where(o => o.EstCorrect).Select(o => o.OptionId).ToList();

                // Vérifier si le candidat a sélectionné exactement toutes les options correctes
                bool estCorrecte = !optionsCorrectes.Except(reponseCandidat.OptionId).Any() &&
                                   !reponseCandidat.OptionId.Except(optionsCorrectes).Any();

                resultats.Add(new VerificationResultat
                {
                    EstCorrect = estCorrecte,
                    Points = estCorrecte ? question.Point : 0
                });
            }

            // Retourner les résultats avec les points
            return resultats;
        }

        public async Task<int> CalculerScore(ReponseCandidat reponseCandidat)
        {
            // Récupérer les résultats de la vérification des réponses
            List<VerificationResultat> resultats = await VerifierReponsesAvecDetails(reponseCandidat);

            // Calculer le score total
            int scoreTotal = resultats.Sum(r => r.Points);

            // Calculer le nombre total de points possibles
            int totalPointsPossibles = resultats.Sum(r => r.Question.Point);

            // Calculer le pourcentage de score
            int score = 0;
            if (totalPointsPossibles > 0)
            {
                score = (int)(((double)scoreTotal / totalPointsPossibles) * 100);
            }

            return score;
        }



        public ReponseCandidat EnregistrerReponseUtilisateur(ReponseCandidat reponse)
        {
            _context.ReponseCandidats.Add(reponse);
            _context.SaveChanges();
            return reponse;
        }

        public async Task<ReponseCandidat> GetReponseByCandidatId(int candidatId)
        {
            return await _context.ReponseCandidats
                .FirstOrDefaultAsync(r => r.CandidatId == candidatId);
        }
    }

    public class VerificationResultat
    {
        public Question Question { get; set; }
        public string ChoixCandidat { get; set; }
        public string ReponseCorrecte { get; set; }
        public bool EstCorrect { get; set; }
        public int Points { get; set; }
    }
}
