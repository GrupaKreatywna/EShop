using Eshop.Core.CQRS;
using Eshop.Core.Data;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Category
{
    public class CreateCategory
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
                _uow.CategoryRepository.Insert(command._data.ToCategoryEntity());
                await _uow.SaveChangesAsync();
            }
        }

        public class Validator : AbstractValidator<Command>
        {

            public Validator()
            {
                RuleFor(x => x._data.CategoryName).NotEmpty();
            }
        }

        public class Data
        {
            
            public int? ParentId { get; set; }
            public string CategoryName { get; set; }

            public Data(int? parentId, string categoryName)
            {
                this.ParentId = parentId;
                this.CategoryName = categoryName;
            }

            public Core.Entities.Category ToCategoryEntity()
            {
                var _category = new Core.Entities.Category
                {
                    ParentId = this.ParentId,
                    CategoryName = this.CategoryName
                };
                return _category;
            }

        }
    }
}
