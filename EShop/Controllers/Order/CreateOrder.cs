using Eshop.Core.CQRS;
using Eshop.Core.Data;
using FluentValidation;
using StackExchange.Redis;
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
            public Data _data { get; set; }
        }

        public class Handler: ICommandHandler<Command>
        {
            private readonly IUnitOfWork _uow;
            private readonly IDatabase _redis;

            public Handler(IUnitOfWork uow, IDatabase redis)
            {
                _uow = uow;
                _redis = redis;
            }

            public async Task Execute(Command command)
            {
               
                RedisKey key = command._data.Key.ToString();
                var cart = await _redis.HashGetAllAsync(key);
                var order = command._data.ToOrderEntity();
                _uow.OrderRepository.Insert(order);
                int id = await _uow.SaveChangesAsync();

                Dictionary<string, string> s = cart.ToStringDictionary();

                var keys = s.Keys;

                foreach (string x in keys)
                {
                    string val = "";
                    s.TryGetValue(x, out val);
                    _uow.OrderProductsRepository.Insert(new Core.Entities.OrderProduct
                    {
                        ProductId = int.Parse(x),
                        OrderId = id,
                        Quantity = int.Parse(val)
                    }); 
                }
                await _uow.SaveChangesAsync();
               
            }
        }
        public class Validator : AbstractValidator<Command>
        {

            public Validator()
            { 
                RuleFor(x => x._data.Adress).NotEmpty();
                RuleFor(x => x._data.City).NotEmpty();
                RuleFor(x => x._data.PostalCode).NotEmpty();
            }
        }

        public class Data
        {
            public Guid Key { get; set; }
            public DateTime OrderDate { get; set; }
            public int? UserId { get; set; }
            public string Adress { get; set; }
            public string ContractingAuthority { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
            public int? DiscountCouponId { get; set; }

            

            public Data(Guid key, DateTime orderDate, string adress, string contractingAuthority, string city, string postalCode, int? discountCouponId, int? userId)
            {
                Key = key;
                OrderDate = orderDate;
                Adress = adress;
                ContractingAuthority = contractingAuthority;
                City = city;
                PostalCode = postalCode;
                DiscountCouponId = discountCouponId;
                UserId = userId;
            }

            public Core.Entities.Order ToOrderEntity()
            {
                Core.Entities.Order o = new Core.Entities.Order
                {
                OrderDate = this.OrderDate,
                Adress = this.Adress,
                ContractingAuthority = this.ContractingAuthority,
                City = this.City,
                PostalCode = this.PostalCode,
                DiscountCouponId = this.DiscountCouponId,
                UserId = this.UserId
            };
                return o;
            }

           
        }
    }
}
