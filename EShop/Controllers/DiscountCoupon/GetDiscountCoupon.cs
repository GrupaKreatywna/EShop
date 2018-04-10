using Eshop.Core.CQRS;
using Eshop.Core.Data;
using EShop.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.DiscountCoupon
{
    public class GetDiscountCoupon
    {
        public class Query : IQuery
        {
            public int Id { get; set; }
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
                var result = await _uow.DiscountCouponRepository.Query().Where(x => x.Id == query.Id).Select(x => new Result
                {
                    Name = x.Name,
                    CouponCode = x.CouponCode,
                    ValidationStart = x.ValidationStart,
                    ValidationEnd = x.ValidationEnd
                }).FirstOrDefaultAsync();
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
