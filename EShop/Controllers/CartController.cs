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

        [HttpPost("/api/Cart/delete")]
        public async Task Delete(Guid cartKey, int productId, int quantity)
        {
            await _commandDispatcher.Dispatch<DeleteProductFromCart.Command>(new DeleteProductFromCart.Command { Item = new DeleteProductFromCart.CartItem { Key = cartKey, Id = productId, Quantity = quantity } });
        }
    }
}