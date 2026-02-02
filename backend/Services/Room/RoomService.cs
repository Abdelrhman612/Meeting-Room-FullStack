using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataBase.Models;
using backend.Dto.Room;

namespace backend
{
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _repo;

        public RoomService(IRoomRepository repo) => _repo = repo;

        public async Task<Room> CreateRoomAsync(RoomDto dto, int hostUserId)
        {
            var room = new Room
            {
                Name = dto.Name,
                Code = Guid.NewGuid().ToString()[..6],
                HostUserId = hostUserId
            };

            return await _repo.CreateAsync(room);
        }

        public async Task<Room?> GetRoomByCodeAsync(string code)
            => await _repo.GetByCodeAsync(code);
    }

}