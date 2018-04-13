using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Price;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class PriceController : Controller
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public PriceController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("/api/Prices")]
        public async Task<List<GetAllPrices.Result>> GetAll()
        {
            return await _queryDispatcher.Dispatch<GetAllPrices.Query, List<GetAllPrices.Result>>(new GetAllPrices.Query());
        }

        [HttpGet("/api/Price/{id}")]
        public async Task<GetPrice.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetPrice.Query, GetPrice.Result>(new GetPrice.Query(id));
        }

        [HttpPost("")]
        public async Task Create(decimal value, DateTime startDate, DateTime? endDate )
        {
             await _commandDispatcher.Dispatch<CreatePrice.Command>(new CreatePrice.Command()
            {
                _data = new CreatePrice.Data(value, startDate, endDate)

            });

        }
    }
}