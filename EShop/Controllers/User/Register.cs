using Eshop.Core.CQRS;
using Eshop.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.User
{
    public class Register
    {
        public class Command : ICommand
        {
            public Data _data { get; set; }
        }

        public class Handler : ICommandHandler<Command>
        {
            private readonly IUnitOfWork _uow;

            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task Execute(Command command)
            {
                var user = command._data;
                var hash = new HashedPassword(PasswordHelper.CreateHash(user.Password));
                user.Password = hash.ToSaltedPassword();
                _uow.UserRepository.Insert(user.ToUserEntity());
                await _uow.SaveChangesAsync();
            }
        }


        public class Data
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public bool Verified { get; set; }

            public Data(string name, string surname, string email, string password, bool verified = false)
            {
                Name = name;
                Surname = surname;
                Email = email;
                Password = password;
                Verified = verified;
            }

            public Core.Entities.User ToUserEntity()
            {
                var user = new Core.Entities.User
                {
                    Name = this.Name,
                    Surname = this.Surname,
                    Email = this.Email,
                    Password = this.Password,
                    Verified = this.Verified
                };
                return user;
            }

        }
    }
}
