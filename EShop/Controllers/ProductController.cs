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
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public ProductController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("[action]")]
        public async Task<GetProduct.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetProduct.Query, GetProduct.Result>(new GetProduct.Query(id));
        }

        [HttpGet("[action]")]
        public async Task<List<GetProduct.Result>> GetAll()
        {
                return await _queryDispatcher.Dispatch<GetProduct.Query, List<GetProduct.Result>>(new GetProduct.Query());
        }
        [HttpGet("[action]")]
        public async Task<List<GetTenLastProducts.Result>> GetTenLast()
        {
            return await _queryDispatcher.Dispatch<GetTenLastProducts.Query, List<GetTenLastProducts.Result>>(new GetTenLastProducts.Query());
        }

        [HttpPost("[action]")]
        public async Task Create(string Name, string Picture, string Description, string Tags,
                int Count, int? CurrentPriceId, int CategoryId)
        {
            await _commandDispatcher.Dispatch<CreateProduct.Command>(new CreateProduct.Command()
            {
                _data = new CreateProduct.Data(Name,Picture,Description,Tags,Count,CurrentPriceId,CategoryId)
            });   
        }

    }
}