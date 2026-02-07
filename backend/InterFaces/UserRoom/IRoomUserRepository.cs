using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.InterFaces.UserRoom
{
   public interface IRoomUserRepository
{
    Task AddUserToRoomAsync(int roomId, int userId);
    Task RemoveUserFromRoomAsync(int roomId, int userId);
    Task<bool> IsUserInRoomAsync(int roomId, int userId);
    Task<List<int>> GetRoomUsersAsync(int roomId);
}

}