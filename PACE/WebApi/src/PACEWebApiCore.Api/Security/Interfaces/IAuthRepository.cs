using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PACEWebApiCore.Entities.Administration;

namespace PACEWebApiCore.Api.Security.Interfaces
{
    public interface IAuthRepository
    {
        User GetUser(TokenRequest tokenRequest);
    }
}