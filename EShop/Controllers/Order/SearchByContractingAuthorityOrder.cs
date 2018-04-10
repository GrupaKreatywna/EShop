using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Order
{
    public class SearchByContractingAuthorityOrder
    {
        public class Query : IQuery
        {
            public string ContractingAuthority;
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
                var result = await _uow.OrderRepository.Query().Where(x=>x.ContractingAuthority==query.ContractingAuthority).Select(x => new Result()
                {
                    OrderDate = x.OrderDate,
                    Adress = x.Adress,
                    ContractingAuthority = x.ContractingAuthority,
                    City = x.City,
                    PostalCode = x.PostalCode,
                    DiscountCouponId = x.DiscountCouponId
                }
                ).ToListAsync();

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