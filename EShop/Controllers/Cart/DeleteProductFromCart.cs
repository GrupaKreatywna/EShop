using Eshop.Core.CQRS;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Cart
{
    public class DeleteProductFromCart
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
                RedisKey key = command._data.Key.ToString();
                var quantity = await _redis.HashGetAsync(key, command._data.Id);

                if ((int)quantity - command._data.Quantity < 1)
                {
                    await _redis.HashDeleteAsync(key, command._data.Id);
                }
                else
                {
                    await _redis.HashDecrementAsync(key, command._data.Id, command._data.Quantity);
                }
                await _redis.KeyExpireAsync(key, TimeSpan.FromMinutes(15));
            }
        }


        public class Data
        {
            public Guid Key { get; set; }
            public int Id { get; set; }
            public int Quantity { get; set; }
            public Data(Guid key, int id, int quantity)
            {
                this.Key = key;
                this.Id = id;
                this.Quantity = quantity;

            }


        }
    }
}
