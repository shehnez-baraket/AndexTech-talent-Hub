using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;
using AndexTech_Talent_Hub_Web.Services;
using MigraDoc.DocumentObjectModel.Tables;
using MigraDoc.DocumentObjectModel;
using MigraDoc.Rendering;
using System.IO;
using System.Threading.Tasks;
namespace AndexTech_Talent_Hub_Bibliotheque.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReponseController : ControllerBase
    {
        private readonly IReponseService _reponseService;
        private readonly IScoreService _scoreService;
        private readonly IActivityService _activityService;
        private readonly CandidatService _candidatService;

        public ReponseController(IReponseService reponseService,
            IScoreService scoreService,
            IActivityService activityService,
            CandidatService candidatService)
        {
            _reponseService = reponseService;
            _scoreService = scoreService;
            _activityService = activityService;
            _candidatService = candidatService;
        }
        
        [HttpPost("GenererPdfReponsesActivites/{candidatId}/{quizId}")]
        public async Task<IActionResult> GenererPdfReponsesActivites(int candidatId, int quizId)
        {
            var reponses = await _reponseService.GetReponseByCandidatIdAndQuizId(candidatId, quizId);
           

            var copyPasteActivities = await _activityService.GetCopyPasteActivitiesByCandidateIdAndQuizId(candidatId, quizId);
            var tabTrackingActivities = await _activityService.GetTabTrackingActivitiesByCandidateIdAndQuizId(candidatId, quizId);
            var candidat = await _candidatService.GetCandidatById(candidatId);

            if (candidat == null)
            {
                return NotFound("Candidat non trouvé");
            }

            if (!copyPasteActivities.Any() && !tabTrackingActivities.Any())
            {
                return NotFound("Aucune activité trouvée pour ce candidat sur ce quiz");
            }

            // Création du document PDF
            Document document = new Document();
            Section section = document.AddSection();

            // Ajouter le titre
            Paragraph title = section.AddParagraph("Rapport des activités du candidat");
            title.Format.Font.Size = 14;
            title.Format.Font.Bold = true;
            title.Format.SpaceAfter = 10;

            // Ajouter les informations du candidat
            section.AddParagraph($"Candidat ID: {candidat.Id}");
            section.AddParagraph($"Nom: {candidat.Nom}");
            section.AddParagraph($"Prénom: {candidat.Prenom}");

            // Ajouter les activités de copier-coller
            if (copyPasteActivities.Any())
            {
                Paragraph copyPasteTitle = section.AddParagraph("Activités de Copier-Coller:");
                copyPasteTitle.Format.Font.Size = 12;
                copyPasteTitle.Format.Font.Bold = true;
                copyPasteTitle.Format.SpaceAfter = 5;

                Table copyPasteTable = section.AddTable();
                copyPasteTable.Borders.Width = 0.75;
                Column cpCol1 = copyPasteTable.AddColumn(Unit.FromCentimeter(4));
                Column cpCol2 = copyPasteTable.AddColumn(Unit.FromCentimeter(8));
                Column cpCol3 = copyPasteTable.AddColumn(Unit.FromCentimeter(4));

                Row cpHeaderRow = copyPasteTable.AddRow();
                cpHeaderRow.Shading.Color = Colors.Gray;
                cpHeaderRow.Cells[0].AddParagraph("Timestamp");
                cpHeaderRow.Cells[1].AddParagraph("Action");
                cpHeaderRow.Cells[2].AddParagraph("Content");

                foreach (var activity in copyPasteActivities)
                {
                    Row row = copyPasteTable.AddRow();
                    row.Cells[0].AddParagraph(activity.Timestamp.ToString());
                    row.Cells[1].AddParagraph(activity.Action);
                    row.Cells[2].AddParagraph(activity.Content);
                }
            }

            // Ajouter les activités de suivi des onglets
            if (tabTrackingActivities.Any())
            {
                Paragraph tabTrackingTitle = section.AddParagraph("Suivi des Onglets:");
                tabTrackingTitle.Format.Font.Size = 12;
                tabTrackingTitle.Format.Font.Bold = true;
                tabTrackingTitle.Format.SpaceAfter = 5;

                Table tabTrackingTable = section.AddTable();
                tabTrackingTable.Borders.Width = 0.75;
                Column ttCol1 = tabTrackingTable.AddColumn(Unit.FromCentimeter(4));
                Column ttCol2 = tabTrackingTable.AddColumn(Unit.FromCentimeter(8));

                Row ttHeaderRow = tabTrackingTable.AddRow();
                ttHeaderRow.Shading.Color = Colors.Gray;
                ttHeaderRow.Cells[0].AddParagraph("Timestamp");
                ttHeaderRow.Cells[1].AddParagraph("Action");

                foreach (var activity in tabTrackingActivities)
                {
                    Row row = tabTrackingTable.AddRow();
                    row.Cells[0].AddParagraph(activity.Timestamp.ToString());
                    row.Cells[1].AddParagraph(activity.Action);
                }
            }

            // Générer le PDF
            PdfDocumentRenderer renderer = new PdfDocumentRenderer(true)
            {
                Document = document
            };
            renderer.RenderDocument();

            using (MemoryStream stream = new MemoryStream())
            {
                renderer.PdfDocument.Save(stream, false);
                var content = stream.ToArray();
                var contentType = "application/pdf";
                var fileName = $"Rapport_{candidatId}_{quizId}.pdf";
                return File(content, contentType, fileName);
            }
        }

        [HttpPost("GenererPdfReponsesCandidat/{candidatId}/{quizId}")]
        public async Task<IActionResult> GenererPdfReponsesCandidatQuiz(int candidatId, int quizId)
        {
            ReponseCandidat reponse = await _reponseService.GetReponseByCandidatIdAndQuizId(candidatId, quizId);

           

            double score = await _reponseService.CalculerScore(reponse);
            var candidat = await _candidatService.GetCandidatById(candidatId);
            var resultats = await _reponseService.VerifierReponsesAvecDetails(reponse);

            Document document = new Document();
            Section section = document.AddSection();

            Paragraph title = section.AddParagraph("Rapport des réponses candidat");
            title.Format.Font.Size = 14;
            title.Format.Font.Bold = true;
            title.Format.SpaceAfter = 10;

            section.AddParagraph($"Candidat ID: {candidat.Id}");
            section.AddParagraph($"Nom: {candidat.Nom}");
            section.AddParagraph($"Prénom: {candidat.Prenom}");
            section.AddParagraph($"Score : {score}%");
            section.AddParagraph("\n");

            Table table = section.AddTable();
            table.Borders.Width = 0.75;
            Column column1 = table.AddColumn(Unit.FromCentimeter(6));
            Column column2 = table.AddColumn(Unit.FromCentimeter(6));
            Column column3 = table.AddColumn(Unit.FromCentimeter(6));

            Row headerRow = table.AddRow();
            headerRow.Shading.Color = Colors.Gray;
            headerRow.Cells[0].AddParagraph("Question");
            headerRow.Cells[1].AddParagraph("Choix du Candidat");
            headerRow.Cells[2].AddParagraph("Réponse Correcte");

            foreach (var resultat in resultats)
            {
                Row row = table.AddRow();
                row.Cells[0].AddParagraph(resultat.Question.Texte);
                row.Cells[1].AddParagraph(resultat.ChoixCandidat);
                row.Cells[2].AddParagraph(resultat.ReponseCorrecte);
                row.Cells[0].Format.Font.Color = resultat.EstCorrect ? Colors.Green : Colors.Red;
            }

            PdfDocumentRenderer renderer = new PdfDocumentRenderer(true)
            {
                Document = document
            };
            renderer.RenderDocument();

            string fileName = $"rapport_reponses_{candidat.Nom}_{candidat.Prenom}.pdf";
            fileName = string.Concat(fileName.Split(Path.GetInvalidFileNameChars()));

            using (var stream = new MemoryStream())
            {
                renderer.PdfDocument.Save(stream, false);
                return File(stream.ToArray(), "application/pdf", fileName);
            }
        }

        [HttpPost("GenererPdfResultats/{candidatId}")]
        public async Task<IActionResult> GenererPdfResultats(int candidatId)
        {
            ReponseCandidat reponse = await _reponseService.GetReponseByCandidatId(candidatId); // Récupérer la réponse unique du candidat
           //Candidat candidat = await _candidatService.GetCandidatById(candidatId);
            // Vérifier si la réponse existe
            if (reponse == null)
            {
                // Gérer le cas où aucune réponse n'est trouvée pour le candidat
                return NotFound("Aucune réponse trouvée pour ce candidat.");
            }

            double score = await _reponseService.CalculerScore(reponse);
            var candidat = await _candidatService.GetCandidatById(candidatId);
            var copyPasteActivities = await _activityService.GetCopyPasteActivities(candidatId);
            var tabTrackingActivities = await _activityService.GetTabTrackingActivities(candidatId);

            Document document = new Document();
            Section section = document.AddSection();
            Paragraph title = section.AddParagraph("Rapport d'Activité du Candidat");
            title.Format.Font.Size = 14;
            title.Format.Font.Bold = true;
            title.Format.SpaceAfter = 10;

            section.AddParagraph($"Candidat ID: {candidat.Id}");
            section.AddParagraph($"Nom: {candidat.Nom}");
            section.AddParagraph($"Prénom: {candidat.Prenom}");
            section.AddParagraph($"Score : {score}%");
            section.AddParagraph("\n");

            Paragraph copyPasteTitle = section.AddParagraph("Activités de Copier-Coller:");
            copyPasteTitle.Format.Font.Size = 12;
            copyPasteTitle.Format.Font.Bold = true;
            copyPasteTitle.Format.SpaceAfter = 5;

            Table copyPasteTable = section.AddTable();
            copyPasteTable.Borders.Width = 0.75;
            Column cpColumn1 = copyPasteTable.AddColumn(Unit.FromCentimeter(4));
            Column cpColumn2 = copyPasteTable.AddColumn(Unit.FromCentimeter(8));
            Column cpColumn3 = copyPasteTable.AddColumn(Unit.FromCentimeter(4));

            Row cpHeaderRow = copyPasteTable.AddRow();
            cpHeaderRow.Shading.Color = Colors.Gray;
            cpHeaderRow.Cells[0].AddParagraph("Timestamp");
            cpHeaderRow.Cells[1].AddParagraph("Action");
            cpHeaderRow.Cells[2].AddParagraph("Content");

            foreach (var activity in copyPasteActivities)
            {
                Row row = copyPasteTable.AddRow();
                row.Cells[0].AddParagraph(activity.Timestamp.ToString());
                row.Cells[1].AddParagraph(activity.Action);
                row.Cells[2].AddParagraph(activity.Content);
            }

            Paragraph tabTrackingTitle = section.AddParagraph("Suivi des Onglets:");
            tabTrackingTitle.Format.Font.Size = 12;
            tabTrackingTitle.Format.Font.Bold = true;
            tabTrackingTitle.Format.SpaceAfter = 5;

            Table tabTrackingTable = section.AddTable();
            tabTrackingTable.Borders.Width = 0.75;
            Column ttColumn1 = tabTrackingTable.AddColumn(Unit.FromCentimeter(4));
            Column ttColumn2 = tabTrackingTable.AddColumn(Unit.FromCentimeter(8));

            Row ttHeaderRow = tabTrackingTable.AddRow();
            ttHeaderRow.Shading.Color = Colors.Gray;
            ttHeaderRow.Cells[0].AddParagraph("Timestamp");
            ttHeaderRow.Cells[1].AddParagraph("Action");

            foreach (var activity in tabTrackingActivities)
            {
                Row row = tabTrackingTable.AddRow();
                row.Cells[0].AddParagraph(activity.Timestamp.ToString());
                row.Cells[1].AddParagraph(activity.Action);
            }

            PdfDocumentRenderer renderer = new PdfDocumentRenderer(true)
            {
                Document = document
            };
            renderer.RenderDocument();

            string fileName = $"rapport_activite_{candidat.Nom}_{candidat.Prenom}.pdf";
            fileName = string.Concat(fileName.Split(Path.GetInvalidFileNameChars()));

            using (var stream = new MemoryStream())
            {
                renderer.PdfDocument.Save(stream, false);
                return File(stream.ToArray(), "application/pdf", fileName);
            }
        }
    

        

    [HttpPost("GenererPdfReponsesCandidat/{candidatId}")]
        public async Task<IActionResult> GenererPdfReponsesCandidat(int candidatId)
        {

            ReponseCandidat reponse = await _reponseService.GetReponseByCandidatId(candidatId); // Récupérer la réponse unique du candidat

            double score = await _reponseService.CalculerScore(reponse);
            var copyPasteActivities = await _activityService.GetCopyPasteActivities(reponse.CandidatId);
            var tabTrackingActivities = await _activityService.GetTabTrackingActivities(reponse.CandidatId);
            var candidat = await _candidatService.GetCandidatById(reponse.CandidatId);
            var resultats = await _reponseService.VerifierReponsesAvecDetails(reponse);

            // Création du document PDF
            Document document = new Document();
            Section section = document.AddSection();

            // Ajouter le titre
            Paragraph title = section.AddParagraph("Rapport des réponses candidat");
            title.Format.Font.Size = 14;
            title.Format.Font.Bold = true;
            title.Format.SpaceAfter = 10;

            // Ajouter les informations du candidat
            section.AddParagraph($"Candidat ID: {candidat.Id}");
            section.AddParagraph($"Nom: {candidat.Nom}");
            section.AddParagraph($"Prénom: {candidat.Prenom}");
            section.AddParagraph($"Score : {score}%");
            section.AddParagraph("\n");

            // Ajouter le tableau des questions et réponses
            Table table = section.AddTable();
            table.Borders.Width = 0.75;
            Column column1 = table.AddColumn(Unit.FromCentimeter(6));
            Column column2 = table.AddColumn(Unit.FromCentimeter(6));
            Column column3 = table.AddColumn(Unit.FromCentimeter(6));

            // Ajouter l'entête du tableau
            Row headerRow = table.AddRow();
            headerRow.Shading.Color = Colors.Gray;
            headerRow.Cells[0].AddParagraph("Question");
            headerRow.Cells[1].AddParagraph("Choix du Candidat");
            headerRow.Cells[2].AddParagraph("Réponse Correcte");

            // Ajouter les lignes de données
            foreach (var resultat in resultats)
            {
                Row row = table.AddRow();
                row.Cells[0].AddParagraph(resultat.Question.Texte);
                row.Cells[1].AddParagraph(resultat.ChoixCandidat);
                row.Cells[2].AddParagraph(resultat.ReponseCorrecte);
                row.Cells[0].Format.Font.Color = resultat.EstCorrect ? Colors.Green : Colors.Red;
            }

            // Générer le PDF
            PdfDocumentRenderer renderer = new PdfDocumentRenderer(true)
            {
                Document = document
            };
            renderer.RenderDocument();

            string fileName = $"rapport_reponses_{candidat.Nom}_{candidat.Prenom}.pdf";
            // Remplacer les caractères non valides par des underscores
            fileName = string.Concat(fileName.Split(System.IO.Path.GetInvalidFileNameChars()));

            using (var stream = new MemoryStream())
            {
                renderer.PdfDocument.Save(stream, false);
                return File(stream.ToArray(), "application/pdf", fileName);
            }
        }  
      

        [HttpPost("VerifierReponses")]
        public async Task<ActionResult<List<bool>>> VerifierReponses([FromBody] ReponseCandidat reponse)
        {
            var resultats = await _reponseService.VerifierReponses(reponse);
            return Ok(resultats);
        }


        [HttpPost("CalculerScore")]
        public async Task<ActionResult<double>> CalculerScore([FromBody] ReponseCandidat reponse)
        {
            int score = await _reponseService.CalculerScore(reponse);
            await _scoreService.EnregistrerScore(reponse,score);

            return Ok(score);
        }


        [HttpPost]
        public IActionResult EnregistrerReponse([FromBody] ReponseCandidat reponse)
        {
            if (reponse == null)
            {
                return BadRequest("Reponse utilisateur invalide");
            }
            var reponseEnregistree = _reponseService.EnregistrerReponseUtilisateur(reponse);

            if (reponseEnregistree == null)
            {
                return StatusCode(500, "Erreur lors de l'enregistrement de la réponse utilisateur");
            }

            return Ok(reponseEnregistree);
        }


        [HttpGet("GetCandidatQuizDetails/{candidatId}/{quizId}")]
        public async Task<IActionResult> GetCandidatQuizDetails(int candidatId, int quizId)
        {
            var candidat = await _candidatService.GetCandidatById(candidatId);
            if (candidat == null)
            {
                return NotFound("Candidat non trouvé");
            }

            var reponses = await _reponseService.GetReponseByCandidatIdAndQuizId(candidatId, quizId);
            if (reponses == null)
            {
                return NotFound("Aucune réponse trouvée pour ce candidat sur ce quiz");
            }

            var copyPasteActivities = await _activityService.GetCopyPasteActivities(candidatId);
            var tabTrackingActivities = await _activityService.GetTabTrackingActivities(candidatId);

            var result = new
            {
                Candidat = candidat,
                Reponses = reponses,
                CopyPasteActivities = copyPasteActivities,
                TabTrackingActivities = tabTrackingActivities
            };

            return Ok(result);
        }
        [HttpGet("StatsScoreCandidats")]
        public async Task<IActionResult> GetStatsScoreCandidats()
        {
            try
            {
                // Récupérer tous les candidats
                var candidats = await _candidatService.GetCandidatsAsync();
                // Initialiser les compteurs
                int countAbove68 = 0;
                int countBelow40 = 0;

                // Parcourir tous les candidats pour calculer les scores
                foreach (var candidat in candidats)
                {
                    var reponse = await _reponseService.GetReponseByCandidatId(candidat.Id);

                    if (reponse == null)
                    {
                        continue;
                    }

                    double score = await _reponseService.CalculerScore(reponse);

                    if (score > 68)
                    {
                        countAbove68++;
                    }
                    else if (score < 40)
                    {
                        countBelow40++;
                    }
                }

                // Créer un objet JSON avec les résultats
                var result = new
                {
                    Above68Percent = countAbove68,
                    Below40Percent = countBelow40
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération des statistiques : {ex.Message}");
            }
        }

    }
}
