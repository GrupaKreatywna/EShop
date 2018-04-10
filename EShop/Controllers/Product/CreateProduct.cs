using Eshop.Core.CQRS;
using Eshop.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Product
{
    public class CreateProduct
    {
        public class Command : ICommand
        {
            public Data _data;
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
                _uow.ProductRepository.Insert(command._data.ToProductEntity());
                await _uow.SaveChangesAsync();
            }
        }

        public class Data
        {
            public string Name { get; set; }
            public string Picture { get; set; }
            public string Description { get; set; }
            public string Tags { get; set; }
            public int Count { get; set; }
            public int? CurrentPriceId { get; set; }
            public int CategoryId { get; set; }

            public Data(string _Name, string _Picture, string _Description, string _Tags, 
                int _Count, int? _CurrentPriceId, int _CategoryId)
            {
                Name = _Name;
                Picture = _Picture;
                Description = _Description;
                Tags = _Tags;
                Count = _Count;
                CurrentPriceId = _CurrentPriceId;
                CategoryId = _CategoryId;
            }

            public Core.Entities.Product ToProductEntity()
            {
                var _product = new Core.Entities.Product()
                {
                Name = this.Name,
                Picture = this.Picture,
                Description = this.Description,
                Tags = this.Tags,
                Count = this.Count,
                CurrentPriceId = this.CurrentPriceId,
                CategoryId = this.CategoryId
            };
                return _product;
            }

        }
    }
}
