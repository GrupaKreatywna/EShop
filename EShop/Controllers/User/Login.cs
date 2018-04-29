using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.User
{
    public class Login
    {
        public class Query : IQuery
        {
            public string Email { get; set; }
            public string Password { get; set; }

            public Query()
            {

            }

            public Query(string email, string password)
            {
                Email = email;
                Password = password;
            }
        }

        public class Handler : IQueryHandler<Query, bool>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<bool> Handle(Query query)
            {
                var result = await _uow.UserRepository.Query().Where(x => query.Email == x.Email).Select(x => new LoginData
                {
                    Email = x.Email,
                    Password = x.Password
                }).FirstOrDefaultAsync();

                if (result == null)
                    return false;
                string saltedPassword = result.Password;
                return PasswordHelper.ValidatePassword(query.Password, saltedPassword);
            }

        }

        public class LoginData
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
