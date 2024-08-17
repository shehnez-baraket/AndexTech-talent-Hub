using AndexTech_Talent_Hub_Bibliotheque.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Bibliotheque.Service.Jwt
{
    public interface IJwtUtils
    {
        string GenerateJwtToken(string userId, string issuer);

        string GenerateJwtToken(string userId, string Quizid, string issuer);
        IEnumerable<Claim> ValidateJwtToken(string token);

    }
}
