using AndexTech_Talent_Hub_Bibliotheque.Models;
using AndexTech_Talent_Hub_Web.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class UtilisateurService
    {
        private readonly IUtilisateurRepository _utilisateurRepository;

        public UtilisateurService(IUtilisateurRepository utilisateurRepository)
        {
            _utilisateurRepository = utilisateurRepository;
        }

        public async Task<Utilisateur> FindByEmailAsync(string email)
        {
            return await _utilisateurRepository.FindByEmailAsync(email);
        }

        public async Task<Utilisateur> FindByIdAsync(int id)
        {
            return await _utilisateurRepository.FindByIdAsync(id);
        }

        public async Task<IEnumerable<Utilisateur>> GetAllUtilisateursAsync()
        {
            return await _utilisateurRepository.GetAllUtilisateursAsync();
        }

        public async Task<IdentityResult> CreateAsync(Utilisateur utilisateur, string password)
        {
            return await _utilisateurRepository.CreateAsync(utilisateur, password);
        }

        public async Task<IdentityResult> UpdateAsync(Utilisateur utilisateur)
        {
            return await _utilisateurRepository.UpdateAsync(utilisateur);
        }

        public async Task<IdentityResult> DeleteAsync(Utilisateur utilisateur)
        {
            return await _utilisateurRepository.DeleteAsync(utilisateur);
        }

        public async Task<IList<string>> GetRolesAsync(Utilisateur utilisateur)
        {
            return await _utilisateurRepository.GetRolesAsync(utilisateur);
        }

        public async Task<IdentityResult> AddToRoleAsync(Utilisateur utilisateur, string role)
        {
            return await _utilisateurRepository.AddToRoleAsync(utilisateur, role);
        }

        public async Task<bool> RoleExistsAsync(string role)
        {
            return await _utilisateurRepository.RoleExistsAsync(role);
        }

        public async Task<IdentityResult> CreateRoleAsync(IdentityRole<int> role)
        {
            return await _utilisateurRepository.CreateRoleAsync(role);
        }

        public async Task<SignInResult> CheckPasswordSignInAsync(Utilisateur utilisateur, string password, bool lockoutOnFailure)
        {
            return await _utilisateurRepository.CheckPasswordSignInAsync(utilisateur, password, lockoutOnFailure);
        }

        public async Task<IdentityResult> ChangePasswordAsync(Utilisateur utilisateur, string currentPassword, string newPassword)
        {
            return await _utilisateurRepository.ChangePasswordAsync(utilisateur, currentPassword, newPassword);
        }
    }
}
