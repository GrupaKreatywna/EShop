using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Cart;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public CartController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("")]
        public async Task AddToCart(Guid key, int id, int quantity)
        {
            await _commandDispatcher.Dispatch<AddProductToCart.Command>(new AddProductToCart.Command()
            {
                _data = new AddProductToCart.Data(key,id,quantity) 
                  
            });
        }

    }
}