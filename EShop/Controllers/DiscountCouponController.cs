using System;
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
        private IQueryDispatcher _queryDispatcher;
        private ICommandDispatcher _commandDispatcher;

        public DiscountCouponController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("[action]")]
        public async Task CreateDC(string _name, int _couponCode, DateTime _validationStart, DateTime _validationEnd)
        {
            //await Task.Delay(1000);
            //return new CreateDiscountCoupon.Result() { Code = 1 };
            //CreateDiscountCoupon.Command command = new CreateDiscountCoupon.Command() { data = new CreateDiscountCoupon.Data() { Name = _name, CouponCode = _couponCode, ValidationEnd = _validationEnd, ValidationStart = _validationStart } };
            await _commandDispatcher.Dispatch<CreateDiscountCoupon.Command>(new CreateDiscountCoupon.Command() { data = new CreateDiscountCoupon.Data(_name, _couponCode, _validationStart, _validationEnd) } );//(command);
        }

        [HttpGet("[action]")]
        public async Task<GetDiscountCoupon.Result> GetDC(int Id)
        {
            return await _queryDispatcher.Dispatch<GetDiscountCoupon.Query, GetDiscountCoupon.Result>(new GetDiscountCoupon.Query() { Id = Id });
        }
    }
}