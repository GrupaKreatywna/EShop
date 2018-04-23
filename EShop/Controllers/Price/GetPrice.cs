using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Price
{
    public class GetPrice
    {
        public class Query : IQuery
        {
            public int Id { get; private set; }

            public Query(int id)
            {
                Id = id;
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
                var result = await _uow.PriceRepository.Query().Where(x =>x.Id == query.Id).Select(x => new Result
                {
                    Id = x.Id,
                    Value = x.Value,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                }
                ).FirstOrDefaultAsync();

                return result;
            }

        }

        public class Result
        {
            public int Id { get; set; }
            public decimal Value { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime? EndDate { get; set; }
        }

    }
}
