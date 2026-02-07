using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using backend.Dto.Auth;
using backend.Dto.User;
using backend.InterFaces.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _auth;
        private readonly IUserService _user;
        public AuthController(IAuthService auth, IUserService user)
        {
            _auth = auth;
            _user = user;
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

        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            // Get user ID from JWT token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "Invalid user ID in token" });
            }

            var user = await _user.GetUserById(userId);
            if (user == null) return NotFound();

            return Ok(new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.ToString()
            });
        }

        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                return Unauthorized(new { message = "Invalid user ID in token" });
            }

            var updateDto = new UpdateUserDto
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,

            };

            var user = await _user.UpdateUser(updateDto, userId);
            return Ok(new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role.ToString()
            });


        }
        

    }
}