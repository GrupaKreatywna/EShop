using Eshop.Core.CQRS;
using Eshop.Core.Data;
using EShop.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.DiscountCoupon
{
    public class CreateDiscountCoupon
    {
        public class Command : ICommand
        {
            public Data Data { get; set; }
        }

        public class Handler : ICommandHandler<Command>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task Execute(Command command)
            {
                _uow.DiscountCouponRepository.Insert(command.Data.ToDiscountCouponEntity());
                await _uow.SaveChangesAsync();
            }
        }

        public class Data
        {
            public string Name { get; set; }
            public int CouponCode { get; set; }
            public DateTime ValidationStart { get; set; }
            public DateTime ValidationEnd { get; set; }

            public Data(string _name, int _couponCode, DateTime _validationStart, DateTime _validationEnd)
            {
                Name = _name;
                CouponCode = _couponCode;
                ValidationStart = _validationStart;
                ValidationEnd = _validationEnd;
            }

            public Core.Entities.DiscountCoupon ToDiscountCouponEntity()
            {
                Core.Entities.DiscountCoupon dc = new Core.Entities.DiscountCoupon
                {
                    Name = Name,
                    CouponCode = CouponCode,
                    ValidationEnd = ValidationEnd,
                    ValidationStart = ValidationStart
                };
                return dc;
            }
        }
    }
}
