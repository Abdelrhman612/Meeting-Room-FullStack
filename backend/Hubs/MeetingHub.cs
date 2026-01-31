using Microsoft.AspNetCore.SignalR;

namespace JobMeeting.Api.Hubs
{
    public class MeetingHub : Hub
    {
        public async Task JoinRoom(string roomId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
            await Clients.OthersInGroup(roomId)
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
