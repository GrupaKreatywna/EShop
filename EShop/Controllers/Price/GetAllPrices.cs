using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Price
{
    public class GetAllPrices
    {
        public class Query : IQuery
        {
            
        }
        public class Handler : IQueryHandler<Query, List<Result>>
        {


            private IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<Result>> Handle(Query query)
            {
                var result = await _uow.PriceRepository.Query().Select(x => new Result()
                {
                    Id = x.Id,
                    Value = x.Value,
                    StartDate = x.StartDate,
                    EndDate = x.EndDate
                }
                ).ToListAsync();

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
