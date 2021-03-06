﻿using Eshop.Core.CQRS;
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
                    Img = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    Quantity = x.Count,
                    CurrentPriceId = x.CurrentPriceId,
                    Price = _uow.PriceRepository.Query().Where(y => y.Id == x.CurrentPriceId).Select(y => y.Value).FirstOrDefault(),
                    CategoryId = x.CategoryId
                }
                ).ToListAsync();
                return result;
            }
        }
        public class Result
        {
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
