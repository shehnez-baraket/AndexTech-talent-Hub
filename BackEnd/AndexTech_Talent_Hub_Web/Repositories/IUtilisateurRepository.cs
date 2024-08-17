using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public interface IUtilisateurRepository
    {
        Task<Utilisateur> FindByEmailAsync(string email);
        Task<Utilisateur> FindByIdAsync(int id);
        Task<IEnumerable<Utilisateur>> GetAllUtilisateursAsync();
        Task<IdentityResult> CreateAsync(Utilisateur utilisateur, string password);
        Task<IdentityResult> UpdateAsync(Utilisateur utilisateur);
        Task<IdentityResult> DeleteAsync(Utilisateur utilisateur);
        Task<IList<string>> GetRolesAsync(Utilisateur utilisateur);
        Task<IdentityResult> AddToRoleAsync(Utilisateur utilisateur, string role);
        Task<bool> RoleExistsAsync(string role);
        Task<IdentityResult> CreateRoleAsync(IdentityRole<int> role);
        Task<SignInResult> CheckPasswordSignInAsync(Utilisateur utilisateur, string password, bool lockoutOnFailure);
        Task<IdentityResult> ChangePasswordAsync(Utilisateur utilisateur, string currentPassword, string newPassword);
    }
}
