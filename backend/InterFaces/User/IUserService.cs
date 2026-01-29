using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace backend
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetUsers();
        public Task<User> GetUserById(int Id);
        public Task<User> CreateUser(CreateUserDto userDto);
        public Task<User> UpdateUser(UpdateUserDto userDto, int Id);
        public Task<User> DeleteUser(int Id);

    }
}