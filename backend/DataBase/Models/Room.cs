using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;

namespace backend.DataBase.Models
{
    public class Room
    {
        public int Id { get; set; }

        [Required]
        public string Code { get; set; } = null!;

        [Required]
        public string Name { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int HostUserId { get; set; }
        public User HostUser { get; set; } = null!;
        public ICollection<RoomUser> RoomUsers { get; set; } = new List<RoomUser>();

    }

}





