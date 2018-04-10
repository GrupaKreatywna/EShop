﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Order;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private IQueryDispatcher _queryDispatcher;
        private ICommandDispatcher _commandDispatcher;

        public OrderController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("[action]")]
        public async Task<GetOrder.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetOrder.Query, GetOrder.Result>(new GetOrder.Query() {ID=id });
        }

        [HttpGet("[action]")]
        public async Task<List<GetOrders.Result>> GetList()
        {
            return await _queryDispatcher.Dispatch<GetOrders.Query, List<GetOrders.Result>> (new GetOrders.Query());
        }

        [HttpGet("[action]")]
        public async Task<List<SearchByDateOrder.Result>> SearchByDate(DateTime orderDate)
        {
            return await _queryDispatcher.Dispatch<SearchByDateOrder.Query, List<SearchByDateOrder.Result>>(new SearchByDateOrder.Query() { OrderDate=orderDate });
        }

        [HttpPost("[action]")]
        public async Task CreateOrder(DateTime _OrderDate, string _Adress, string _ContractingAuthority, string _City, string _PostalCode, int? _DiscountCouponId)
        {
            await _commandDispatcher.Dispatch<CreateOrder.Command>(new CreateOrder.Command() { data = new CreateOrder.Data(_OrderDate,_Adress,_ContractingAuthority,_City,_PostalCode,_DiscountCouponId) });//(command); 

        }
    }
}