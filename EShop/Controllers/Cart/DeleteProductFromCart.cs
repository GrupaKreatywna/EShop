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
                await _redis.HashDeleteAsync(command._data.Key.ToString(), command._data.Id);
            }
        }

        public class Data
        {
            public Guid Key { get; set; }
            public int Id { get; set; }
            public Data(Guid key, int id)
            {
                this.Key = key;
                this.Id = id;
            }
        }
    }
}
