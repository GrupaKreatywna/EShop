using Eshop.Core.CQRS;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Bucket
{
    public class AddProductToBucket
    {
        public class Command : ICommand
        {
            public Data _data { get; set; }
        }

        public class Handler : ICommandHandler<Command>
        {
            

            public async Task Execute(Command command)
            {
                private readonly IDatabase _redis;


            }
        }


        public class Data
        {
            public decimal Value { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime? EndDate { get; set; }

            public Data(decimal value, DateTime startDate, DateTime? endDate)
            {
                this.Value = value;
                this.StartDate = startDate;
                this.EndDate = endDate;
            }

            public Core.Entities.Price ToPriceEntity()
            {
                var price = new Core.Entities.Price
                {
                    Value = this.Value,
                    StartDate = this.StartDate,
                    EndDate = this.EndDate
                };
                return price;
            }
        }
    }
}
