using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataBase.Models;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class RoomRepository : IRoomRepository
    {
        private readonly AppDbContext _context;
        public RoomRepository(AppDbContext context) => _context = context;

        public async Task<Room> CreateAsync(Room room)
        {
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task<Room?> GetByCodeAsync(string code)
            => await _context.Rooms.FirstOrDefaultAsync(r => r.Code == code);

        public async Task<List<Room>> GetAllAsync()
            => await _context.Rooms.ToListAsync();
    }

}


