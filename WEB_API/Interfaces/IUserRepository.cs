using PropertyBrokerWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AuthenticateUser(string userName, string password);
        void Register(string userName, string password);
        Task<bool> UserAlreadyExits(string userName);
    }
}
