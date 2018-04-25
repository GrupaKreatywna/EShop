using Eshop.Core.CQRS;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Cart
{
    public class AddProductToCart
    {
        public class Command : ICommand
        {
            public Data _data { get; set; }
        }

        public class Handler : ICommandHandler<Command>
        {
            readonly IDatabase _redis;

            public Handler(IDatabase redis)
            {
                _redis = redis;
            }

            public async Task Execute(Command command)
            {
                string key = command._data.Key.ToString("n");
                int id = command._data.Id;
                int quantity = command._data.Quantity;

                HashEntry[] tab = new HashEntry[1];
                HashEntry hId = new HashEntry("id", id);
                HashEntry hQuantity = new HashEntry("quantity", quantity);
                tab[0] = hId;
             
                
                //if (_redis.HashExists);
                //{
                //    int q = int.Parse(_redis.ListGetByIndex(key, -1));
                //    quantity += q;
                //    await _redis.ListSetByIndexAsync(key, 1, quantity);

                //}
                //else
                //{
                //    await _redis.HashSetAsync(key,tab);
                //    await _redis.ListRightPushAsync(key, quantity);
                //}
            }
        }


        public class Data
        {
            public Guid Key { get; set; }
            public int Id { get; set; }
            public int Quantity{ get; set; }
            public Data(Guid key, int id, int quantity)
            {
                this.Key = key;
                this.Id = id;
                this.Quantity = quantity;
              
            }

          
        }
    }
}
