using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EShop.Controllers.Product
{
    public class GetTenMostPopularProducts : Controller
    {

        public class Query : IQuery
        {
            public int ID;
            public Query()
            {

            }
        }

        public class Handler : IQueryHandler<Query, List<Result>>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<Result>> Handle(Query query)
            {
                var groupedProductIds = await _uow.OrderProductsRepository.Query().GroupBy(x => x.ProductId).Select(x => new ProductIdd()
                {
                    ID = x.Key,
                    Amount=x.Count()
                }).OrderByDescending(x => x.Amount).Take(10).ToListAsync();

                List<int> ProductIds = new List<int>();

                foreach (ProductIdd productIdd in groupedProductIds) ProductIds.Add(productIdd.ID);

                var result = await _uow.ProductRepository.Query().Join(ProductIds, x => x.Id, id => id, (x, id) => x).Distinct().Select(x => new Result()
                {
                    ID = x.Id,
                    Name = x.Name,
                    Img = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    CurrentPriceId = x.CurrentPriceId,
                    Price = _uow.PriceRepository.Query().Where(y => y.Id == x.CurrentPriceId).Select(y => y.Value).FirstOrDefault(),
                    CategoryId = x.CategoryId,
                    Quantity = _uow.OrderProductsRepository.Query().Where(y => y.ProductId == x.Id).Count(),
                }).OrderByDescending(x=>x.Quantity).ToListAsync();

                return result;
            }
        }

        public class ProductIdd
        {
            public int ID;
            public int Amount;
        }

        public class Result
        {
            public int ID { get; set; }
            public string Name { get; set; }
            public string Img { get; set; }
            public string Description { get; set; }
            public string Tags { get; set; }
            public int? CurrentPriceId { get; set; }
            public decimal? Price { get; set; }
            public int CategoryId { get; set; }
            public int Quantity { get; set; }
        }
    }
}