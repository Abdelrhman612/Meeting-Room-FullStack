using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.Auth;
using backend.InterFaces.Auth;
using backend.Utils.Jwt;

namespace backend.Services.Auth
{
    public class AuthService : IAuthService
    {

        private readonly IAuthRepository _repo;
        private readonly IJwtService _jwtService;
        public AuthService(IAuthRepository repo, IJwtService jwtService)
        {
            _repo = repo;
            _jwtService = jwtService;

        }
        public Task<SginUpDto> SginUp(SginUpDto sginUpDto)
        {
            var Name = sginUpDto.Name;
            var Email = sginUpDto.Email;
            var Password = sginUpDto.Password;
            var Role = sginUpDto.Role;

            var HashPassword = BCrypt.Net.BCrypt.HashPassword(Password);
            var NewUser = new User
            {
                Name = Name,
                Email = Email,
                Password = HashPassword,
                Role = Role
            };

            var isEmailExists = _repo.GetUserByEmail(NewUser).Result?.Email;
            if (Email == isEmailExists)
            {
                throw new Exception("User already exists");
            }
            _repo.AddUser(NewUser);

            var UserRegistered = new SginUpDto
            {
                Name = Name,
                Email = Email,
                Role = Role

            };
            return Task.FromResult(UserRegistered);

        }
        public async Task<string> SginIn(SginInDto sginInDto)
        {
            var Email = sginInDto.Email;
            var Password = sginInDto.Password;

            var user = await _repo.GetUserByEmail(new User { Email = Email });

            if (user == null)
            {
                throw new Exception("User Is Not Found");
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(Password, user.Password);
            if (!isPasswordValid)
            {
                throw new Exception("Invalid password");
            }

            var Payload = new User
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role
            };
            var token = _jwtService.GenerateToken(Payload);
            return token;

        }


    }
}