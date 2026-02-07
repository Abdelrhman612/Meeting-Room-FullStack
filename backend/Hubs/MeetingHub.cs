using backend.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace JobMeeting.Api.Hubs
{


    public class MeetingHub : Hub
    {
        private static Dictionary<string, List<string>> Rooms = new();

        public async Task JoinRoom(string roomCode)
        {
            if (!Rooms.ContainsKey(roomCode))
                Rooms[roomCode] = new List<string>();

            Rooms[roomCode].Add(Context.ConnectionId);

            await Groups.AddToGroupAsync(Context.ConnectionId, roomCode);

            if (Rooms[roomCode].Count == 1)
                await Clients.Caller.SendAsync("YouAreInitiator");
            else
                await Clients.OthersInGroup(roomCode)
                    .SendAsync("UserJoined", Context.ConnectionId);
        }

        public async Task SendOffer(string roomCode, string offer)
            => await Clients.OthersInGroup(roomCode)
                .SendAsync("ReceiveOffer", offer);

        public async Task SendAnswer(string roomCode, string answer)
            => await Clients.OthersInGroup(roomCode)
                .SendAsync("ReceiveAnswer", answer);

        public async Task SendIce(string roomCode, string candidate)
            => await Clients.OthersInGroup(roomCode)
                .SendAsync("ReceiveIce", candidate);
    }

}
