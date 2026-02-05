using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataBase.Models;
using backend.Dto.Room;
using backend.Models;

namespace backend
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _repo;
        private readonly AppDbContext _context;

        public RoomService(IRoomRepository repo, AppDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<Room> CreateRoomAsync(RoomDto dto, int hostUserId)
        {
            // Check if user exists
            var userExists = await _context.Users.FindAsync(hostUserId);
            if (userExists == null)
            {
                throw new Exception($"User with ID {hostUserId} does not exist");
            }

            var room = new Room
            {
                Name = dto.Name,
                Code = GenerateRoomCode(),
                HostUserId = hostUserId,
                CreatedAt = DateTime.UtcNow
            };

            return await _repo.CreateAsync(room);
        }

        public async Task<Room?> GetRoomByCodeAsync(string code)
        {
            return await _repo.GetByCodeAsync(code);
        }

        private string GenerateRoomCode()
        {
            return Guid.NewGuid().ToString()[..8].ToUpper();
        }
    }
}