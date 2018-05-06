using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.User
{
    public class GetUserInfo
    {
        public class Query : IQuery
        {
            public string Email { get; private set; }

            public Query(string email)
            {
                Email = email;
            }
        }

        public class Handler : IQueryHandler<Query, Result>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<Result> Handle(Query query)
            {
                var result = await _uow.UserRepository.Query().Where(x => x.Email == query.Email).Select(x => new Result
                {
                    Name = x.Name,
                    Surname = x.Surname,
                    Email = x.Email,
                    Verified = x.Verified,
                    Address = x.Address,
                    City = x.City,
                    PostalCode = x.PostalCode

                }
                ).FirstOrDefaultAsync();
                return result;
            }
        }
        public class Result
        {
            public string Name { get; set; }
            public string Surname { get; set; }
            public string Email { get; set; }
            public bool Verified { get; set; }
            public string Address { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
        }
    }
}
