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
            public int Id;
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
                var result = await _uow.DiscountCouponRepository.Query().Where(x => x.Id == query.Id).Select(x => new Result()
                {
                    Name = x.Name,
                    CouponCode = x.CouponCode,
                    ValidationStart = x.ValidationStart,
                    ValidationEnd = x.ValidationEnd
                }).FirstOrDefaultAsync();
                return result;
            }
        }

        public class HandlerAll : IQueryHandler<Query, List<ResultWithId>>
        {
            private IUnitOfWork _uow;
            public HandlerAll(IUnitOfWork uow)
            {
                _uow = uow;
            }
            public async Task<List<ResultWithId>> Handle(Query query)
            {
                var result = await _uow.DiscountCouponRepository.Query().Select(x => new ResultWithId()
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
