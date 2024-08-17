using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.AspNetCore.Identity;
using AndexTech_Talent_Hub_Bibliotheque.Data;
using AndexTech_Talent_Hub_Bibliotheque.Service.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //gère les opérations d'authentification et de gestion des utilisateurs
    //dans l'application, en utilisant JWT pour l'authentification
    //et les autorisations basées sur les rôles pour sécuriser les endpoints.
    public class UtilisateurController : ControllerBase
    {
        private readonly UserManager<Utilisateur> _utilisateurManager;
        private readonly SignInManager<Utilisateur> _signInManager;
        private readonly AppDbContext _dbContext;
        private readonly IJwtUtils _jwtUtils;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole<int>> _roleManager; // Modifier ici


        public UtilisateurController(UserManager<Utilisateur> utilisateurManager,
         SignInManager<Utilisateur> signInManager,
         AppDbContext dbContext,
         IJwtUtils jwtUtils,
         IConfiguration configuration,
         RoleManager<IdentityRole<int>> roleManager) // Modifier ici
        {
            _utilisateurManager = utilisateurManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
            _roleManager = roleManager; // Assurez-vous d'initialiser _roleManager avec roleManager
        }



        [HttpPost("connexion")]
        public async Task<IActionResult> Connexion(AuthentificationAdmin request)
        {
            // Récupérer l'utilisateur en utilisant son adresse e-mail
            var user = await _utilisateurManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                // L'utilisateur n'existe pas
                return BadRequest(new { message = "Email ou mot de passe incorrect!" });
            }

            // Vérifier le mot de passe en utilisant PasswordHasher
            var result = await _signInManager.CheckPasswordSignInAsync(user, request.MotDePasse, false);

            if (result.Succeeded)
            {
                // Générer et retourner le jeton JWT
                var claims = new[]
                {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
                var token = new JwtSecurityToken(
                    issuer: null,
                    audience: null,
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(7),
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                // Retourner le jeton JWT avec la réponse Ok
                return Ok(new { message = "Connexion réussie.", token = tokenString });
            }
            else
            {
                return BadRequest(new { message = "Email ou mot de passe incorrect!" });
            }
        }

        [HttpGet("utilisateurs")]
        public ActionResult<IEnumerable<UserWithRoleDto>> GetUtilisateurs()
        {
            try
            {
                var utilisateurs = _utilisateurManager.Users.ToList();
                var utilisateursAvecRole = new List<UserWithRoleDto>();

                foreach (var utilisateur in utilisateurs)
                {
                    var roles = _utilisateurManager.GetRolesAsync(utilisateur).Result;
                    var role = roles.FirstOrDefault();

                    var utilisateurAvecRole = new UserWithRoleDto
                    {
                        id = utilisateur.Id,
                        UserName = utilisateur.UserName,
                        Nom = utilisateur.Nom,
                        Prenom = utilisateur.Prenom,
                        Email = utilisateur.Email,
                        Role = role
                    };

                    utilisateursAvecRole.Add(utilisateurAvecRole);
                }

                return Ok(utilisateursAvecRole);
            }
            catch (InvalidCastException ex)
            {
                // Log the exception details
                Console.WriteLine($"InvalidCastException: {ex.Message}");
                return BadRequest(new { message = "An error occurred while processing your request." });
            }
        }


        //[Authorize(Roles = "Administrateur")]
        [HttpGet("utilisateur/{id}")]
        public ActionResult<Utilisateur> GetUtilisateur(string id)
        {
            var utilisateur = _utilisateurManager.FindByIdAsync(id).Result;
            if (utilisateur == null)
            {
                return NotFound();
            }
            return Ok(utilisateur);
        }


        //[Authorize(Roles = "Administrateur")]
        [HttpPut("utilisateur/{id}")]
        public async Task<IActionResult> UpdateUtilisateur(int id, Utilisateur utilisateur)
        {
            if (!utilisateur.Id.Equals(id))
            {
                return BadRequest();
            }

            var result = await _utilisateurManager.UpdateAsync(utilisateur);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(new { message = result.Errors.FirstOrDefault()?.Description });
        }

        //[Authorize(Roles = "Administrateur")]
        [HttpDelete("utilisateur/{id}")]
        public async Task<IActionResult> DeleteUtilisateur(string id)
        {
            var utilisateur = await _utilisateurManager.FindByIdAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            var result = await _utilisateurManager.DeleteAsync(utilisateur);
            if (result.Succeeded)
            {
                return NoContent();
            }
            return BadRequest(new { message = result.Errors.FirstOrDefault()?.Description });
        }

        //[Authorize(Roles = "Administrateur")]
        [HttpPost]
        public async Task<IActionResult> CreateUser(Utilisateur utilisateur)
        {
            if (ModelState.IsValid)
            {
                // Utilisez l'email comme nom d'utilisateur par défaut
                utilisateur.UserName = utilisateur.Email;

                // Essayez de créer l'utilisateur
                var result = await _utilisateurManager.CreateAsync(utilisateur, utilisateur.PasswordHash);

                // Vérifiez si la création a réussi
                if (result.Succeeded)
                {
                    // Vérifiez si le rôle "Admin" existe déjà
                    var roleExists = await _roleManager.RoleExistsAsync("Admin");

                    // Si le rôle n'existe pas, ajoutez-le
                    if (!roleExists)
                    {
                        var role = new IdentityRole<int> { Name = "Admin" };
                        var roleResult = await _roleManager.CreateAsync(role);

                        if (!roleResult.Succeeded)
                        {
                            return BadRequest(new { message = "Failed to create the Admin role." });
                        }
                    }

                    // Ajoutez l'utilisateur au rôle "Admin"
                    var addToRoleResult = await _utilisateurManager.AddToRoleAsync(utilisateur, "Admin");

                    if (!addToRoleResult.Succeeded)
                    {
                        return BadRequest(new { message = "Failed to add the user to the Admin role." });
                    }

                    // Renvoyer une réponse JSON explicite
                    return Ok(new { message = "Utilisateur créé avec succès." });
                }
                else
                {
                    // Si la création de l'utilisateur a échoué, renvoyez les erreurs
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                // Si le modèle n'est pas valide, renvoyez les erreurs de validation
                return BadRequest(ModelState);
            }
        }
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            // Trouver l'utilisateur par son ID
            var utilisateur = await _utilisateurManager.FindByIdAsync(request.UserId.ToString());
            if (utilisateur == null)
            {
                return NotFound(new { message = "Utilisateur non trouvé." });
            }

            // Vérifier l'ancien mot de passe et mettre à jour avec le nouveau mot de passe
            var result = await _utilisateurManager.ChangePasswordAsync(utilisateur, request.OldPassword, request.NewPassword);

            if (result.Succeeded)
            {
                return Ok(new { message = "Mot de passe changé avec succès." });
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }



    }
}