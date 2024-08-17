using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace AndexTech_Talent_Hub_Bibliotheque.Data
{
    public class AppDbContext : IdentityDbContext<Utilisateur, IdentityRole<int>, int>
    {

        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<Candidat> Candidats { get; set; }
        public DbSet<Questionnaire> Questionnaires { get; set; }
        public DbSet<QCM> QCMs { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Option> Option { get; set; }
        public DbSet<ResultatQuiz> ResultatsQuiz { get; set; }
        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<QCMQuestion> QCMQuestion { get; set; }
        public DbSet<LienQuiz> LienQuizs { get; set; }
        public DbSet<Niveau> Niveau { get; set; }
        public DbSet<ReponseCandidat> ReponseCandidats { get; set; }
        public DbSet<CopyPasteEvent> CopyPasteEvent { get; set; }
        public DbSet<TabTracking> TabTracking { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<AvisClient> AvisClient { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
           
        }
    }
}

