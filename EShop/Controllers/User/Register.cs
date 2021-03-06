﻿using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Eshop.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
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

       

        public class Validator : AbstractValidator<Command>
        {
            private readonly IUnitOfWork _uow;

            public Validator(IUnitOfWork uow)
            {
                _uow = uow;
                RuleFor(x => x._data.Email).EmailAddress().MustAsync(async (request, val, token) => {
                    string _email = await _uow.UserRepository.Query().Where(x => x.Email == val).Select(x => x.Email)
                    .FirstOrDefaultAsync();
                    if (_email == null)
                        return true;
                    return false;
                }).WithMessage("This email is already in use");
                RuleFor(x => x._data.Password).MinimumLength(6);               
            }
        }
        public class Data
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public bool Verified { get; set; }
            public string Adress { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }

            public Data(string name, string surname, string email, string password,  string adress, string city, string postalCode, bool verified = false)
            {
                Name = name;
                Surname = surname;
                Email = email;
                Password = password;
                Verified = verified;
                Adress = adress;
                City = city;
                PostalCode = postalCode;
            }

            public Core.Entities.User ToUserEntity()
            {
                var user = new Core.Entities.User
                {
                    Name = this.Name,
                    Surname = this.Surname,
                    Email = this.Email,
                    Password = this.Password,
                    Verified = this.Verified,
                    Address = this.Adress,
                    City = this.City,
                    PostalCode = this.PostalCode
                };
                return user;
            }

        }
    }
}
