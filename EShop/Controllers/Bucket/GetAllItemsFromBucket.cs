using Eshop.Core.CQRS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Bucket
{
    public class GetAllItemsFromBucket
    {
        public class Query : IQuery
        {

        }
        public class Handler : IQueryHandler<Query, List<Result>>
        {


            public async Task<List<Result>> Handle(Query query)
            {
               

                
            }

        }

        public class Result
        {
            public int Id { get; set; }
            public int Quantity { get; set; }
        }
    }
}
