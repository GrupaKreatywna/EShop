using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public ProductController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("/api/Product/{id}")]
        public async Task<GetProduct.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetProduct.Query, GetProduct.Result>(new GetProduct.Query(id));
        }

        [HttpGet("/api/Products")]
        public async Task<List<GetProduct.Result>> GetAll()
        {
                return await _queryDispatcher.Dispatch<GetProduct.Query, List<GetProduct.Result>>(new GetProduct.Query());
        }

        [HttpGet("/api/Products/{categoryId}")]
        public async Task<List<GetProductsByCategory.Result>> GetAllByCategory(int categoryId)
        {
            return await _queryDispatcher.Dispatch<GetProductsByCategory.Query, List<GetProductsByCategory.Result>>(new GetProductsByCategory.Query(categoryId));
        }

        [HttpGet("/api/Product/Latest")]
        public async Task<List<GetTenLastProducts.Result>> GetTenLast()
        {
            return await _queryDispatcher.Dispatch<GetTenLastProducts.Query, List<GetTenLastProducts.Result>>(new GetTenLastProducts.Query());
        }

        [HttpGet("/api/Product/Popular")]
        public async Task<List<GetTenMostPopularProducts.Result>> GetTenTheMostPopular()
        {
            return await _queryDispatcher.Dispatch<GetTenMostPopularProducts.Query, List<GetTenMostPopularProducts.Result>>(new GetTenMostPopularProducts.Query());
        }

        [HttpPost("")]
       // [Authorize]
        public async Task Create(string name, string img, string description, string tags,
                int quantity, int? currentPriceId, int categoryId)
        {
            await _commandDispatcher.Dispatch<CreateProduct.Command>(new CreateProduct.Command()
            {
                _data = new CreateProduct.Data(name,img,description,tags,quantity,currentPriceId,categoryId)
            });   
        }
        [HttpGet("/api/Products/Search/{word}")]
        public async Task<List<SearchProduct.Result>> Search(string word)
        {
            return await _queryDispatcher.Dispatch<SearchProduct.Query, List<SearchProduct.Result>>(new SearchProduct.Query(){Word=word});
        }

    }
}