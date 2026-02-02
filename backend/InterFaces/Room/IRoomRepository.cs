using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataBase.Models;

namespace backend
{
    public interface IRoomRepository
    {
        Task<Room> CreateAsync(Room room);
        Task<Room?> GetByCodeAsync(string code);
        Task<List<Room>> GetAllAsync();
    }

}