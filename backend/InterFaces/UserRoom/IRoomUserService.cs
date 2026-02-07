using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.RoomUser;

namespace backend.InterFaces.UserRoom
{
    public interface IRoomUserService
    {
        Task JoinRoomAsync(JoinRoomDto dto);
        Task LeaveRoomAsync(JoinRoomDto dto);
        Task<RoomUsersDto> GetRoomUsersAsync(int roomId);
    }

}