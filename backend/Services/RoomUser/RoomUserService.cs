using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.RoomUser;
using backend.InterFaces.UserRoom;

namespace backend.Services.RoomUser
{
    public class RoomUserService : IRoomUserService
    {
        private readonly IRoomUserRepository _repo;

        public RoomUserService(IRoomUserRepository repo)
        {
            _repo = repo;
        }

        public async Task JoinRoomAsync(JoinRoomDto dto)
        {
            var alreadyInRoom = await _repo.IsUserInRoomAsync(dto.RoomId, dto.UserId);
            if (!alreadyInRoom)
                await _repo.AddUserToRoomAsync(dto.RoomId, dto.UserId);
        }

        public async Task LeaveRoomAsync(JoinRoomDto dto)
        {
            var inRoom = await _repo.IsUserInRoomAsync(dto.RoomId, dto.UserId);
            if (inRoom)
                await _repo.RemoveUserFromRoomAsync(dto.RoomId, dto.UserId);
        }

        public async Task<RoomUsersDto> GetRoomUsersAsync(int roomId)
        {
            var users = await _repo.GetRoomUsersAsync(roomId);
            return new RoomUsersDto { UserIds = users };
        }
    }

}