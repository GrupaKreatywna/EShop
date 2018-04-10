using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Product
{
    public class GetProduct
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
                var result = await _uow.ProductRepository.Query().Where(x => x.Id == query.ID).Select(x => new Result()
                {
                    Name = x.Name,
                    Picture = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    Count = x.Count,
                    CurrentPriceId = x.CurrentPriceId,
                    CategoryId = x.CategoryId
                }
                ).FirstOrDefaultAsync();
                return result;
            }
        }
        public class Result
        {
            public string Name { get; set; }
            public string Picture { get; set; }
            public string Description { get; set; }
            public string Tags { get; set; }
            public int Count { get; set; }
            public int? CurrentPriceId { get; set; }
            public int CategoryId { get; set; }
        }


    }
}
