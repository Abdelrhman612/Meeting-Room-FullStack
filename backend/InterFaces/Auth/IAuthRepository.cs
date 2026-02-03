using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data.Models;
using backend.Dto.Auth;

namespace backend
{
    public interface IAuthRepository
    {
        Task<User> AddUser(User user);
        Task<User> GetUserByEmail(User user);


    }
}