using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Auth;
using backend.InterFaces.Auth;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;

        public AuthController(IAuthService auth)
        {
            _auth = auth;
        }
        [HttpPost("SginUp")]
        public async Task<SginUpDto> SginUp(SginUpDto sginUpDto)
        {
            var user = await _auth.SginUp(sginUpDto);
            return user;
        }
        [HttpPost("SginIn")]
        public async Task<IActionResult> SginIn(SginInDto sginInDto)
        {
            var token = await _auth.SginIn(sginInDto);
            return Ok(new { Token = token });
        }

    }
}