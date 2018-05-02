﻿using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Product
{
    public class GetProductsByCategory
    {
        public class Query : IQuery
        {
            public int CategoryId { get; private set; }

            public Query(int categoryId)
            {
                CategoryId = categoryId;
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
                var result = await _uow.ProductRepository.Query().Where(x=> x.CategoryId == query.CategoryId).Select(x => new Result
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
