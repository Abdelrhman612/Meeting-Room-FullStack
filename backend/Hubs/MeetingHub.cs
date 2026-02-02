using backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace JobMeeting.Api.Hubs
{


    public class MeetingHub : Hub
    {
        private readonly AppDbContext _context;
        public MeetingHub(AppDbContext context)
        {
            _context = context;
        }
        public async Task JoinRoom(string roomCode)
        {
            var room = await _context.Rooms
                .FirstOrDefaultAsync(r => r.Code == roomCode);

            if (room == null)
                throw new HubException("Room not found");

            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

            await Clients.OthersInGroup(roomCode)
                .SendAsync("UserJoined", Context.ConnectionId);
        }


        public async Task SendOffer(string roomId, string offer)
        {
            await Clients.OthersInGroup(roomId)
                .SendAsync("ReceiveOffer", offer);
        }

        public async Task SendAnswer(string roomId, string answer)
        {
            await Clients.OthersInGroup(roomId)
                .SendAsync("ReceiveAnswer", answer);
        }

        public async Task SendIce(string roomId, string candidate)
        {
            await Clients.OthersInGroup(roomId)
                .SendAsync("ReceiveIce", candidate);
        }
    }
}
