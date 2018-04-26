﻿using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Product
{
    public class GetTenLastProducts
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
                var result = await _uow.ProductRepository.Query().OrderByDescending(x => x.Id).Take(10).Select(x => new Result()
                {
                    ID = x.Id,
                    Name = x.Name,
                    Picture = x.Picture,
                    Description = x.Description,
                    Tags = x.Tags,
                    Count = x.Count,
                    CurrentPriceId = x.CurrentPriceId,
                    CategoryId = x.CategoryId
                }).ToListAsync();

                return result;
            }
        }

        public class Result
        {
            public int ID { get; set; }
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