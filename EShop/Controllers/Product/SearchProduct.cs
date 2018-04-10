using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Product
{
    public class SearchProduct
    {
        public class Query : IQuery
        {
            public string Word;
        }

        public class SearchHandler : IQueryHandler<Query, List<Result>>
        {
            private IUnitOfWork _uow;
            public SearchHandler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<Result>> Handle(Query query)
            {
                var result = await _uow.ProductRepository.Query().Where(x=>x.Name.Contains(query.Word)).Select(x => new Result()
                {
                    Name = x.Name,
                    Picture = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    Count = x.Count,
                    CurrentPriceId = x.CurrentPriceId,
                    CategoryId = x.CategoryId
                }
                ).ToListAsync();
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
