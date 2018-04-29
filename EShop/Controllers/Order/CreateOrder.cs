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

            

            public Data(DateTime orderDate, string adress, string contractingAuthority, string city, string postalCode, int? discountCouponId)
            {
                OrderDate = orderDate;
                Adress = adress;
                ContractingAuthority = contractingAuthority;
                City = city;
                PostalCode = postalCode;
                DiscountCouponId = discountCouponId;
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
