using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;
        public UserRepository(AppDbContext db)
        {
            _db = db;

        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await _db.Users.ToListAsync();
            return users;
        }

        public async Task<User> GetByIdAsync(int Id)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Id == Id);
            return user!;


        }

        public async Task<User> AddUserAsync(User user)
        {
            var AddUser = await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
            return AddUser.Entity;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var UpdateUser = _db.Users.Update(user);
            await _db.SaveChangesAsync();
            return UpdateUser.Entity;
        }

        public async Task<User> DeleteUserAsync(User user)
        {
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return user;
        }
    }
}