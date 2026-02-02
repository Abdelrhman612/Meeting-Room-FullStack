using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DataBase.Models;
using backend.Dto.Room;

namespace backend
{
    public interface IRoomService
    {
        Task<Room> CreateRoomAsync(RoomDto dto, int hostUserId);
        Task<Room?> GetRoomByCodeAsync(string code);
    }

}