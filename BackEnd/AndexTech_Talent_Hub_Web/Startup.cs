using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Bibliotheque.Service.Jwt;
using AndexTech_Talent_Hub_Bibliotheque.Services.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AndexTech_Talent_Hub_Bibliotheque.Services;
using AndexTech_Talent_Hub_Web.Services;
using AndexTech_Talent_Hub_Web.Repositories;

namespace AndexTech_Talent_Hub_Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
           // services.AddDbContext<AppDbContext>(); // Ajoutez votre contexte de base de données ici

            services.AddTransient<AppDbContext>();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", builder =>
                {
                    builder.WithOrigins("http://localhost:4200") 
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            services.AddIdentity<Utilisateur, IdentityRole<int>>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
            })


                    .AddEntityFrameworkStores<AppDbContext>()
                   .AddDefaultTokenProviders();
            //services.AddIdentityRole<IdentityRole<Utilisateur>>();
            services.AddScoped<IUtilisateurRepository, UtilisateurRepository>();
            services.AddScoped<UtilisateurService>();
            services.AddScoped<IQuizService, QuizService>();         
            //services.AddScoped<RoleManager<IdentityRole>>(); // Assurez-vous d'ajouter cette ligne
            services.AddScoped<ICandidatRepository, CandidatRepository>();

            // Enregistrer CandidatService
            services.AddScoped<CandidatService>();
            //services.AddScoped<IQuestionRepository, QuestionRepository>(); // Ajout unique pour l'interface IQuestionRepository
            services.AddScoped<ILienQuizRepository, LienQuizRepository>();
            services.AddScoped<IScoreService, ScoreService>();
            services.AddScoped<IQuestionRepository, QuestionRepository>();
            services.AddScoped<IReponseService, ReponseService>();
            services.AddScoped<EmailService>();
            services.AddScoped<IActivityService, ActivityService>();

            services.AddScoped<IQCMRepository, QCMRepository>();
            services.AddScoped<QCMService>();
            services.AddScoped<QuestionService>();
            services.AddScoped<QuestionRepository>();
            services.AddScoped<TabTrackingService>();
            services.AddScoped<CopyPasteEventService>();
            services.AddScoped<CandidatService>();
            //services.AddScoped<IQuestionRepository,QuestionRepository>();
            services.AddScoped<IJwtUtils>(provider =>
            {
                var configuration = provider.GetRequiredService<IConfiguration>();
                var secretKey = configuration["JwtSettings:SecretKey"]; // Récupérer la clé secrète depuis la configuration
                return new JwtUtils(configuration, secretKey);
            });
            services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));




            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["JwtSettings:SecretKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdministrateurPolicy", policy =>
                    policy.RequireRole("Administrateur"));

                options.AddPolicy("RHPolicy", policy =>
                    policy.RequireRole("RH"));
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Test PFE", Version = "v1" });

                // Configuration pour inclure les jetons JWT
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Enter your JWT token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowOrigin");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API Title v1");
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
