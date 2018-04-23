using Eshop.Core.CQRS;
using Eshop.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Price
{
    public class CreatePrice
    {
        public class Command : ICommand
        {
            public Data _data { get; set; }
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
                _uow.PriceRepository.Insert(command._data.ToPriceEntity());
                await _uow.SaveChangesAsync();
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
