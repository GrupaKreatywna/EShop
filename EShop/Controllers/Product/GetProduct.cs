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

            public Query()
            {

            }

            public Query(int id)
            {
                ID = id;
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
                
                    var result = await _uow.ProductRepository.Query().Where(x => x.Id == query.ID).Select(x => new Result
                    {
                        Name = x.Name,
                        Img = x.Picture,
                        Description = x.Description,
                        Tags = x.Tags,
                        Quantity = x.Count,
                        CurrentPriceId = x.CurrentPriceId,
                        Price = null,
                        CategoryId = x.CategoryId
                    }
                    ).FirstOrDefaultAsync();

                result.Price = await _uow.PriceRepository.Query().Where(x => x.Id == result.CurrentPriceId).Select(x => x.Value).FirstOrDefaultAsync();
                    return result;                
            }

        }

        public class HandlerList : IQueryHandler<Query, List<Result>>
        {
            private readonly IUnitOfWork _uow;
            public HandlerList(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<Result>> Handle(Query query)
            {
                var result = await _uow.ProductRepository.Query().Select(x => new Result
                {
                    ID = x.Id,
                    Name = x.Name,
                    Img = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    Quantity = x.Count,
                    CurrentPriceId = x.CurrentPriceId,
                    Price = _uow.PriceRepository.Query().Where(y => y.Id == x.CurrentPriceId).Select(y => y.Value).FirstOrDefault(),
                CategoryId = x.CategoryId
                }).ToListAsync();
                
                return result;
            }
        }






        public class Result
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Img { get; set; }
            public string Description { get; set; }
            public string Tags { get; set; }
            public int Quantity { get; set; }
            public int? CurrentPriceId { get; set; }
            public decimal? Price { get; set; }
            public int CategoryId { get; set; }
        }


    }
}
