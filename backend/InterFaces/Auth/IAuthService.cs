using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dto.Auth;

namespace backend.InterFaces.Auth
{
    public interface IAuthService
    {
        Task<SignUpDto> SginUp(SignUpDto signUpDto);
        Task<string> SginIn(SignInDto signInDto);

    }
}