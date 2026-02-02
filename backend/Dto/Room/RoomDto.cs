using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dto.Room
{
    public class RoomDto
    {
        public string Name { get; set; } = null!;
        public int HostUserId { get; set; }

    }
}