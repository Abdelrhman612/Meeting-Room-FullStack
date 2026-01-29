using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace backend
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _repo.GetAllAsync();
            var AllUser = users.Select(u => new User
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role

            }).ToList();
            return AllUser;
        }
        public Task<User> GetUserById(int Id)
        {
            var user = _repo.GetByIdAsync(Id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return user;
        }

        public Task<User> CreateUser(CreateUserDto userDto)
        {
            var HashPassword = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = HashPassword,
                Role = userDto.Role
            };

            var existingUsers = _repo.GetAllAsync().Result;
            if (existingUsers.Any(u => u.Email == user.Email))
            {
                throw new Exception("Email already exists");
            }

            return _repo.AddUserAsync(user);

        }

        public Task<User> UpdateUser(UpdateUserDto userDto, int Id)
        {
            var user = new User
            {
                Id = Id,
                Name = userDto.Name,
                Email = userDto.Email,
                Role = userDto.Role
            };
            return _repo.UpdateUserAsync(user);
        }

        public Task<User> DeleteUser(int Id)
        {
            var user = _repo.GetByIdAsync(Id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            return _repo.DeleteUserAsync(user.Result);
        }
    }
}