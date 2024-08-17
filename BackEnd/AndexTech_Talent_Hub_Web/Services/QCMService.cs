using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Bibliotheque.Data;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class QCMService
    {
        private readonly AppDbContext _context;

        public QCMService(AppDbContext context)
        {
            _context = context;
        }

        /*public List<Question> GetRandomQuestions(int numberOfQuestions, Niveau niveau)
        {
            // Récupérer un échantillon aléatoire de questions correspondant au niveau demandé
            var randomQuestions = _context.Questions
                .Where(q => q.Niveau == niveau)
                .OrderBy(q => Guid.NewGuid()) // Mélanger les questions aléatoirement
                .Take(numberOfQuestions)
                .ToList();

            return randomQuestions;
        }*/
        public List<Question> GetRandomQuestions(int numberOfQuestions, int NiveauId)
        {
            // Récupérer le nombre total de questions disponibles pour ce niveau
            var totalQuestionsCount = _context.Questions.Count(q => q.NiveauId == NiveauId);

            // Vérifier si le nombre de questions demandées est supérieur au nombre total de questions disponibles
            if (numberOfQuestions > totalQuestionsCount)
            {
                throw new Exception("Le nombre de questions demandées dépasse le nombre total de questions disponibles.");
            }

            // Récupérer un échantillon aléatoire de questions correspondant au niveau demandé
            var randomQuestions = _context.Questions
                .Where(q => q.NiveauId == NiveauId)
                .OrderBy(q => Guid.NewGuid()) // Mélanger les questions aléatoirement
                .Take(numberOfQuestions)
                .ToList();

            return randomQuestions;
        }
    }
}