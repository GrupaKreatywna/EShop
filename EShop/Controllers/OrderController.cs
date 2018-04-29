using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Order;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class OrderController : Controller
    {
        private IQueryDispatcher _queryDispatcher;
        private ICommandDispatcher _commandDispatcher;

        public OrderController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("/api/Order/{id}")]
        public async Task<GetOrder.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetOrder.Query, GetOrder.Result>(new GetOrder.Query() {ID=id });
        }

        [HttpGet("/api/Orders")]
        public async Task<List<GetOrders.Result>> GetList()
        {
            return await _queryDispatcher.Dispatch<GetOrders.Query, List<GetOrders.Result>> (new GetOrders.Query());
        }

        [HttpGet("/api/Orders/SearchByDate/{orderDate}")]
        public async Task<List<SearchByDateOrder.Result>> SearchByDate(DateTime orderDate)
        {
            return await _queryDispatcher.Dispatch<SearchByDateOrder.Query, List<SearchByDateOrder.Result>>(new SearchByDateOrder.Query() { OrderDate=orderDate });
        }

        [HttpGet("/api/Orders/SearchByContractingAuthority/{contractingAuthority}")]
        public async Task<List<SearchByContractingAuthorityOrder.Result>> SearchByContractingAuthority(string contractingAuthority)
        {
            return await _queryDispatcher.Dispatch<SearchByContractingAuthorityOrder.Query, List<SearchByContractingAuthorityOrder.Result>>
                (new SearchByContractingAuthorityOrder.Query() { ContractingAuthority=contractingAuthority });
        }

        [HttpPost("")]
        public async Task CreateOrder(DateTime orderDate, string adress, string contractingAuthority, string city, string postalCode, int? discountCouponId)
        {
            await _commandDispatcher.Dispatch<CreateOrder.Command>(new CreateOrder.Command{ _data = new CreateOrder.Data(orderDate,adress,contractingAuthority,city,postalCode,discountCouponId) });

        }
    }
}