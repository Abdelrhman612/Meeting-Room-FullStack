using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Utils.Jwt
{
    public class JwtService : IJwtService
    {
        private readonly Jwt _jwt;

        public JwtService(Jwt jwt)
        {
            _jwt = jwt ?? throw new ArgumentNullException(nameof(jwt));
        }

        public string GenerateToken(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user), "User cannot be null");

            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_jwt.Key);

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                };

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = _jwt.Issuer,
                    Audience = _jwt.Audience,
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.UtcNow.AddDays(double.Parse(_jwt.Lifetime)),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (SecurityTokenException ex)
            {
                throw new ApplicationException("Error while generating JWT token", ex);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Unexpected error occurred while generating token", ex);
            }
        }
    }
}
