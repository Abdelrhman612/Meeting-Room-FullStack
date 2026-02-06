using backend.Data.Models;
using backend.DataBase.Models;

public class RoomUser
{
    public int Id { get; set; }


    public int RoomId { get; set; }
    public Room Room { get; set; } = null!;


    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}
