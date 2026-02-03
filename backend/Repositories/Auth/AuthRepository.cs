using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.Auth;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class AuthRepository : IAuthRepository
    {
        private readonly AppDbContext _db;
        public AuthRepository(AppDbContext db)
        {
            _db = db;

        }
        public async Task<User> AddUser(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return user;

        }
        public async Task<User> GetUserByEmail(User user)
        {
            var Email = user.Email;
            var NewUser = await _db.Users.FirstOrDefaultAsync(u => u.Email == Email);
            return NewUser!;
        }
    }


}