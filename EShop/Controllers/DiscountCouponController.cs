﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using Microsoft.AspNetCore.Mvc;
using EShop.Controllers.DiscountCoupon;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class DiscountCouponController : Controller
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public DiscountCouponController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("/api/Coupon")]
        public async Task Create(string _name, int _couponCode, DateTime _validationStart, DateTime _validationEnd)
        {
            await _commandDispatcher.Dispatch<CreateDiscountCoupon.Command>(new CreateDiscountCoupon.Command { Data = new CreateDiscountCoupon.Data(_name, _couponCode, _validationStart, _validationEnd) } );
        }

        [HttpGet("/api/Coupon/{Id}")]
        public async Task<GetDiscountCoupon.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetDiscountCoupon.Query, GetDiscountCoupon.Result>(new GetDiscountCoupon.Query { Id = id });
        }

        [HttpGet("/api/Coupons")]
        public async Task<List<GetAllDiscountCoupons.ResultWithId>> GetAll()
        {
            return await _queryDispatcher.Dispatch<GetAllDiscountCoupons.Query, List<GetAllDiscountCoupons.ResultWithId>>(new GetAllDiscountCoupons.Query());
        }

        [HttpGet("/api/Coupons/latest")]
        public async Task<List<GetLast10DiscountCoupons.ResultWithId>> GetLast10()
        {
            return await _queryDispatcher.Dispatch<GetLast10DiscountCoupons.Query, List<GetLast10DiscountCoupons.ResultWithId>>(new GetLast10DiscountCoupons.Query());
        }
    }
}