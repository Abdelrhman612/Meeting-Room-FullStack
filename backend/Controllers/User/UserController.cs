using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend
{

    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _user;
        public UserController(IUserService user)
        {
            _user = user;

        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> FindAll()
        {
            var users = await _user.GetUsers();
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize]

        public async Task<IActionResult> FindById(int id)
        {
            var user = await _user.GetUserById(id);
            return Ok(user);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]


        public async Task<IActionResult> Create([FromBody] CreateUserDto userDto)
        {
            var user = await _user.CreateUser(userDto);
            return Ok(user);
        }
        [HttpPatch("{id}")]
        [Authorize]

        public async Task<IActionResult> Update([FromRoute] int Id, [FromBody] UpdateUserDto userDto)
        {
            var user = await _user.UpdateUser(userDto, Id);
            return Ok(user);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> Delete([FromRoute] int Id)
        {
            await _user.DeleteUser(Id);
            return Ok(new { message = "User deleted successfully" });
        }

    }
}