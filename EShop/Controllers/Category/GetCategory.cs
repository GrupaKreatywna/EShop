using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Category
{
    public class GetCategory
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
              
                    var result = await _uow.CategoryRepository.Query().Where(x => x.Id == query.ID).Select(x => new Result()
                    {
                        ID = x.Id,
                        CategoryName = x.CategoryName,
                        ParentId = x.ParentId
                    }
                    ).FirstOrDefaultAsync();
                    return result;
               
            }

        }

        public class HandlerList : IQueryHandler<Query, List<Result>>
        {
            private readonly IUnitOfWork __uow;
            public HandlerList(IUnitOfWork uow)
            {
                __uow = uow;
            }

            public async Task<List<Result>> Handle(Query query)
            {
                var result = await __uow.CategoryRepository.Query().Select(x => new Result()
                {
                    ID = x.Id,
                    CategoryName = x.CategoryName,
                    ParentId = x.ParentId
                }).ToListAsync();

                return result;
            }
        }
        public class Result
        {
            public int ID { get; set; }
            public int? ParentId { get; set; }
            public string CategoryName { get; set; }
        }
    }
}
