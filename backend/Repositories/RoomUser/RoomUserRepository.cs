using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.InterFaces.UserRoom;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class RoomUserRepository : IRoomUserRepository
    {
        private readonly AppDbContext _context;

        public RoomUserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddUserToRoomAsync(int roomId, int userId)
        {
            var roomUser = new RoomUser
            {
                RoomId = roomId,
                UserId = userId,
                JoinedAt = DateTime.UtcNow
            };

            _context.RoomUsers.Add(roomUser);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveUserFromRoomAsync(int roomId, int userId)
        {
            var roomUser = await _context.RoomUsers
                .FirstOrDefaultAsync(x => x.RoomId == roomId && x.UserId == userId);

            if (roomUser != null)
            {
                _context.RoomUsers.Remove(roomUser);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> IsUserInRoomAsync(int roomId, int userId)
            => await _context.RoomUsers
                .AnyAsync(x => x.RoomId == roomId && x.UserId == userId);

        public async Task<List<int>> GetRoomUsersAsync(int roomId)
            => await _context.RoomUsers
                .Where(x => x.RoomId == roomId)
                .Select(x => x.UserId)
                .ToListAsync();
    }

}