using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.RoomUser;
using backend.InterFaces.UserRoom;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.UserRoom
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomUserController : ControllerBase
    {
        private readonly IRoomUserService _service;

        public RoomUserController(IRoomUserService service)
        {
            _service = service;
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinRoom([FromBody] JoinRoomDto dto)
        {
            await _service.JoinRoomAsync(dto);
            return Ok("Joined Room");
        }

        [HttpPost("leave")]
        public async Task<IActionResult> LeaveRoom([FromBody] JoinRoomDto dto)
        {
            await _service.LeaveRoomAsync(dto);
            return Ok("Left Room");
        }

        [HttpGet("{roomId}/users")]
        public async Task<IActionResult> GetUsers(int roomId)
        {
            var users = await _service.GetRoomUsersAsync(roomId);
            return Ok(users);
        }
    }

}