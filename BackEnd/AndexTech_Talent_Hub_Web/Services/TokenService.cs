using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
namespace AndexTech_Talent_Hub_Web.Services
{
    public class TokenService
    {
        private readonly string _secretKey;
        private readonly string _issuer;

        public TokenService(string secretKey, string issuer)
        {
            _secretKey = secretKey;
            _issuer = issuer;
        }

        public string GenerateToken(int candidateId, int quizId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim("candidateId", candidateId.ToString()),
                new Claim("quizId", quizId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddHours(3), // Durée de validité du token (3 heure dans cet exemple)
                Issuer = _issuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}