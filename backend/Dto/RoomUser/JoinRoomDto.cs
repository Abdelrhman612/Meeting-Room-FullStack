using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.RoomUser
{
    public class JoinRoomDto
    {
        public int RoomId { get; set; }
        public int UserId { get; set; }
    }
}