using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Eshop.Core.Entities;
using EShop.Controllers.Order;
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
            public int Id;
        }

        public class Handler : IQueryHandler<Query, Result>
        {
            private IUnitOfWork _wow;
            public Handler(IUnitOfWork wow)
            {
                _wow = wow;
            }

            public async Task<Result> Handle(Query query)
            {

                var result = await _wow.OrderRepository.Query().Where(x => x.Id == query.Id).Select(x => new Result()
                {
                    OrderDate = x.OrderDate,
                    Adress = x.Adress,
                    ContractingAuthority = x.ContractingAuthority,
                    City = x.City,
                    PostalCode = x.PostalCode,
                    DiscountCouponId = x.DiscountCouponId
                }
                ).FirstOrDefaultAsync();

                return result;
            }
        }

        public class Result
        {
            public DateTime OrderDate { get; set; }
            public string Adress { get; set; }
            public string ContractingAuthority { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
            public int? DiscountCouponId { get; set; }
        }
    }
}
