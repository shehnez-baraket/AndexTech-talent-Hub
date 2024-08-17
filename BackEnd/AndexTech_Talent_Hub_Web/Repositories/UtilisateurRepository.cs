using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Repositories
{
    public class UtilisateurRepository : IUtilisateurRepository
    {
        private readonly UserManager<Utilisateur> _userManager;
        private readonly RoleManager<IdentityRole<int>> _roleManager;

        public UtilisateurRepository(UserManager<Utilisateur> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<Utilisateur> FindByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<Utilisateur> FindByIdAsync(int id)
        {
            return await _userManager.FindByIdAsync(id.ToString());
        }

        public async Task<IEnumerable<Utilisateur>> GetAllUtilisateursAsync()
        {
            return await Task.FromResult(_userManager.Users);
        }

        public async Task<IdentityResult> CreateAsync(Utilisateur utilisateur, string password)
        {
            return await _userManager.CreateAsync(utilisateur, password);
        }

        public async Task<IdentityResult> UpdateAsync(Utilisateur utilisateur)
        {
            return await _userManager.UpdateAsync(utilisateur);
        }

        public async Task<IdentityResult> DeleteAsync(Utilisateur utilisateur)
        {
            return await _userManager.DeleteAsync(utilisateur);
        }

        public async Task<IList<string>> GetRolesAsync(Utilisateur utilisateur)
        {
            return await Task.FromResult(await _userManager.GetRolesAsync(utilisateur));
        }

        public async Task<IdentityResult> AddToRoleAsync(Utilisateur utilisateur, string role)
        {
            return await _userManager.AddToRoleAsync(utilisateur, role);
        }

        public async Task<bool> RoleExistsAsync(string role)
        {
            return await _roleManager.RoleExistsAsync(role);
        }

        public async Task<IdentityResult> CreateRoleAsync(IdentityRole<int> role)
        {
            return await _roleManager.CreateAsync(role);
        }

        public async Task<SignInResult> CheckPasswordSignInAsync(Utilisateur utilisateur, string password, bool lockoutOnFailure)
        {
            var result = await _userManager.CheckPasswordAsync(utilisateur, password);

            if (result)
            {
                return SignInResult.Success;
            }
            else
            {
                return SignInResult.Failed;
            }
        }


        public async Task<IdentityResult> ChangePasswordAsync(Utilisateur utilisateur, string currentPassword, string newPassword)
        {
            return await _userManager.ChangePasswordAsync(utilisateur, currentPassword, newPassword);
        }
    }
}
