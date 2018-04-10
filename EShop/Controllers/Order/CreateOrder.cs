using Eshop.Core.CQRS;
using Eshop.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Order
{
    public class CreateOrder
    {
        public class Command : ICommand
        {
            public Data data;
        }

        public class Handler: ICommandHandler<Command>
        {
            private IUnitOfWork _uow;

            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task Execute(Command command)
            {
                _uow.OrderRepository.Insert(command.data.ToOrderEntity());
                await _uow.SaveChangesAsync();
            }
        }

        public class Data
        {
            public DateTime OrderDate { get; set; }
            public string Adress { get; set; }
            public string ContractingAuthority { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
            public int? DiscountCouponId { get; set; }

            public Data(DateTime _OrderDate,string _Adress,string _ContractingAuthority, string _City, string _PostalCode, int? _DiscountCouponId)
            {
                OrderDate = _OrderDate;
                Adress = _Adress;
                ContractingAuthority = _ContractingAuthority;
                City = _City;
                PostalCode = _PostalCode;
                DiscountCouponId = _DiscountCouponId;
            }

            public Core.Entities.Order ToOrderEntity()
            {
                Core.Entities.Order o = new Core.Entities.Order()
                {
                OrderDate = OrderDate,
                Adress = Adress,
                ContractingAuthority = ContractingAuthority,
                City = City,
                PostalCode = PostalCode,
                DiscountCouponId = DiscountCouponId
            };
                return o;
            }

           
        }
    }
}
