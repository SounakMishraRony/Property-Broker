using Microsoft.EntityFrameworkCore;
using PropertyBrokerWebApp.Interfaces;
using PropertyBrokerWebApp.Models;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> AuthenticateUser(string userName, string passwordText)
        {
            var user = await dc.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user == null || user.PasswordKey == null)
                return null;
            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                return null;
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
                var PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));

                for(int i =0;i<PasswordHash.Length;i++)
                {
                    if (PasswordHash[i] != password[i])
                        return false; 
                }
                return true;
            }
        }

        public void Register(string userName, string password)
        {
            byte[] PasswordHash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            User user = new User();
            user.UserName = userName;
            user.Password = PasswordHash;
            user.PasswordKey = passwordKey;
            dc.Users.Add(user);
        }

        public async Task<bool> UserAlreadyExits(string userName)
        {
            return await dc.Users.AnyAsync(x => x.UserName == userName);
        }
    }
}
