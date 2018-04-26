using Eshop.Core.CQRS;
using Newtonsoft.Json;
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
            public CartItem Item { get; set; }
        }

        public class Handler : ICommandHandler<Command>
        {
            private readonly IDatabase _redis;

            public Handler(IDatabase redis)
            {
                _redis = redis;
            }

            public async Task Execute(Command command)
            {
                RedisKey key = command.Item.Key.ToString();
                var quantity = await _redis.HashGetAsync(key, command.Item.Id);
                if ((int)quantity - command.Item.Quantity < 1)
                {
                    await _redis.HashDeleteAsync(key, command.Item.Id);
                }
                else
                {
                    await _redis.HashDecrementAsync(key, command.Item.Id, command.Item.Quantity);
                }
                await _redis.KeyExpireAsync(key, TimeSpan.FromMinutes(15));
            }
        }

        public class CartItem
        {
            public Guid Key { get; set; }
            public int Id { get; set; }
            public int Quantity { get; set; }
        }
    }
}
