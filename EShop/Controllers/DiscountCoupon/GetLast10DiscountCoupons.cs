using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.DiscountCoupon
{
    public class GetLast10DiscountCoupons
    {
        public class Query : IQuery
        {
            public int Id { get; set; }
        }

        public class Handler : IQueryHandler<Query, List<ResultWithId>>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }
            public async Task<List<ResultWithId>> Handle(Query query)
            {
                var result = await _uow.DiscountCouponRepository.Query().OrderByDescending(x => x.Id).Take(10).Select(x => new ResultWithId
                {
                    Id = x.Id,
                    Name = x.Name,
                    CouponCode = x.CouponCode,
                    ValidationStart = x.ValidationStart,
                    ValidationEnd = x.ValidationEnd
                }).ToListAsync();
                return result;
            }
        }

        public class Result
        {
            public string Name { get; set; }
            public int CouponCode { get; set; }
            public DateTime ValidationStart { get; set; }
            public DateTime ValidationEnd { get; set; }
        }

        public class ResultWithId : Result
        {
            public int Id { get; set; }
        }
    }
}
