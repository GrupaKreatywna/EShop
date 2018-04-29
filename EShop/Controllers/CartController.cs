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
        public async Task Delete(Guid key, int id, int quantity)
        {
            await _commandDispatcher.Dispatch<DeleteProductFromCart.Command>(new DeleteProductFromCart.Command { _data = new DeleteProductFromCart.Data(key, id, quantity) });
        }
   
        [HttpPost("")]
        public async Task AddToCart([FromBody]AddProductToCart.Data data)
        {
            await _commandDispatcher.Dispatch<AddProductToCart.Command>(new AddProductToCart.Command()
            {
                _data = data

            });
        }

        [HttpGet("/api/Cart")]
        public async Task<List<GetAllItemsFromCart.Result>> GetCart(Guid key)
        {
            return await _queryDispatcher.Dispatch<GetAllItemsFromCart.Query, List<GetAllItemsFromCart.Result>>(new GetAllItemsFromCart.Query(key));
        }

    }
}