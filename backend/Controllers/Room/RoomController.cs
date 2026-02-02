using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Room;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Room
{
    [ApiController]
    [Route("api/rooms")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _service;

        public RoomController(IRoomService service) => _service = service;

        [HttpPost]
        public async Task<IActionResult> Create(RoomDto dto)
        {

            var room = await _service.CreateRoomAsync(dto, dto.HostUserId);
            return Ok(room);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var room = await _service.GetRoomByCodeAsync(code);
            if (room == null) return NotFound();
            return Ok(room);
        }
    }

}