using Dapper;
using GenericRepository;
using PACEWebApiCore.Api.Security.Interfaces;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using Serilog;
using SqlCodeGenerator;
using System;
using System.Data;
using System.Linq;

namespace PACEWebApiCore.Api.Security
{
    public class AuthRepository : DataConnection, IAuthRepository
    {
        private const string SaltKey = "FFBE1264AD5E4CB39DFD616637784465";

        public User GetUser(TokenRequest tokenRequest)
        {
            try
            {
                if (!tokenRequest.Username.Contains("\\"))
                {
                    throw new ArgumentException(nameof(tokenRequest.Username) + " does not includedomain!!");
                }

                var username = tokenRequest.Username.Split("\\")[1];
                var domain = tokenRequest.Username.Split("\\")[0];

                var sqlGenerator = new SqlGenerator<User>();
                var sql = sqlGenerator.GetSelect(new {UserName = username, Domain = domain, tokenRequest.Password});
                var param = new DynamicParameters();
                param.Add("@Username", username);
                param.Add("@Domain", domain);
                param.Add("@Password", tokenRequest.Password.Encrypt(SaltKey));
                var user = Connection.Query<User>(sql, param, commandType: CommandType.Text).FirstOrDefault();
                return user;
            }
            catch (Exception e)
            {
                Log.Error("Error occured getting {user}: ", typeof(User).Name, e.Message, e.StackTrace);
                throw;
            }
        }

        public AuthRepository(IDbConnection connection) : base(connection)
        {
        }
    }
}