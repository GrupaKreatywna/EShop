using Eshop.Core.CQRS;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Cart
{
    public class GetAllItemsFromCart
    {
        public class Query : IQuery
        {
            public Guid Key { get; private set; }

            public Query(Guid key)
            {
                Key = key;
            }
        }
        public class Handler : IQueryHandler<Query, List<Result>>
        {
            private readonly IDatabase _redis;

            public Handler(IDatabase redis)
            {
                _redis = redis;
            }

            public async Task<List<Result>> Handle(Query query)
            {

                var items = await _redis.HashGetAllAsync(query.Key.ToString());
                
                Dictionary<string, string> s = items.ToStringDictionary();

                var results = new List<Result>();
                var keys = s.Keys;
                var Values = s.Values;

                foreach(string x in keys)
                {
                    string val="";
                    s.TryGetValue(x, out val);
                    var result = new Result()
                    {
                        Id = int.Parse(x),
                        Quantity = int.Parse(val)
                    };
                    results.Add(result);
                }
                return results;
            }

        }

        public class Result
        {
            public int Id { get; set; }
            public int Quantity { get; set; }
        }
    }
}
