using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Order
{
    public class GetOrder
    {
        public class Query : IQuery
        {
            public int ID;
        }

        public class Handler : IQueryHandler<Query, Result>
        {
            private IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<Result> Handle(Query query)
            {
                var result = await _uow.OrderRepository.Query().Where(x => x.Id == query.ID).Select(x => new Result()
                {
                    OrderDate = x.OrderDate,
                    Address = x.Address,
                    ContractingAuthority = x.ContractingAuthority,
                    City = x.City,
                    PostalCode = x.PostalCode,
                    DiscountCouponId = x.DiscountCouponId
  
                }
                ).FirstOrDefaultAsync();
                return result;
            }
        }

        
        public class HandlerList : IQueryHandler<Query, List<Result>>
        {
            private IUnitOfWork _uow;
            public HandlerList(IUnitOfWork uow)
            {
                _uow = uow;
            }
            
            public async Task<List<Result>> Handle(Query query)
            {
                var result = await _uow.OrderRepository.Query().Select(x => new Result()
                {
                    OrderDate = x.OrderDate,
                    Address = x.Address,
                    ContractingAuthority = x.ContractingAuthority,
                    City = x.City,
                    PostalCode = x.PostalCode,
                    DiscountCouponId = x.DiscountCouponId,
                    Email = x.Email
                }
                ).ToListAsync();

                return result;
            }

        }

            public class Result
        {
            public DateTime OrderDate { get; set; }
            public string Email { get; set; }
            public string Address { get; set; }
            public string ContractingAuthority { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
            public int? DiscountCouponId { get; set; }

        }
    }

}
