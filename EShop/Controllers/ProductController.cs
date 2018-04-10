using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Product;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private IQueryDispatcher _queryDispatcher;
        private ICommandDispatcher _commandDispatcher;

        public ProductController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("[action]")]
        public async Task<GetProduct.Result> Get()
        {
            return await _queryDispatcher.Dispatch<GetProduct.Query, GetProduct.Result>(new GetProduct.Query());
        }

        [HttpGet("/api/Products/Search/{word}")]
        public async Task<List<SearchProduct.Result>> Search(string word)
        {
            return await _queryDispatcher.Dispatch<SearchProduct.Query, List<SearchProduct.Result>>(new SearchProduct.Query(){Word=word});
        }

    }
}