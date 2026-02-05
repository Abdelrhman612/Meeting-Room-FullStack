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
        [HttpPost("SignUp")]
        public async Task<SignUpDto> SginUp(SignUpDto signUpDto)
        {
            var user = await _auth.SginUp(signUpDto);
            return user;
        }
        [HttpPost("SignIn")]
        public async Task<IActionResult> SginIn(SignInDto signInDto)
        {
            var token = await _auth.SginIn(signInDto);
            return Ok(new { Token = token });
        }

    }
}