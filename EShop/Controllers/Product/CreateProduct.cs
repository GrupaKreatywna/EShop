﻿using Eshop.Core.CQRS;
using Eshop.Core.Data;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
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
                string catstring = await GenerateCategoryString(command._data.CategoryId);

                _uow.ProductRepository.Insert(command._data.ToProductEntity(catstring));
                await _uow.SaveChangesAsync();
            }

            private async Task<string> GenerateCategoryString(int? id)
            {
                int?[] cat;

                string result = id.ToString();

                cat = await _uow.CategoryRepository.Query().Where(x => x.Id == id).Select(x => x.ParentId).ToArrayAsync();
                while (cat[0] != null)
                {
                    id = cat[0];
                    result = cat[0].ToString() + "-" + result;
                    cat = await _uow.CategoryRepository.Query().Where(x => x.Id == id).Select(x => x.ParentId).ToArrayAsync();
                }
                
                return result;
            }
        }

        public class Validator : AbstractValidator<Command>
        {

            public Validator()
            {
                RuleFor(x => x._data.Name).NotEmpty();
                RuleFor(x => x._data.Quantity).GreaterThanOrEqualTo(0);
            }
        }


        public class Data
        {
            public string Name { get; set; }
            public string Img { get; set; }
            public string Description { get; set; }
            public string Tags { get; set; }
            public int Quantity { get; set; }
            public int? CurrentPriceId { get; set; }
            public int CategoryId { get; set; }
            public string CategoryIdString { get; set; }

            public Data() { }

            public Data(string name, string img, string description, string tags, 
                int quantity, int? _CurrentPriceId, int _CategoryId)
            {
                Name = name;
                Img = img;
                Description = description;
                Tags = tags;
                Quantity = quantity;
                CurrentPriceId = _CurrentPriceId;
                CategoryId = _CategoryId;
            }

            public Core.Entities.Product ToProductEntity(string categoryString)
            {
                var _product = new Core.Entities.Product()
                {
                Name = this.Name,
                Picture = this.Img,
                Description = this.Description,
                Tags = this.Tags,
                Count = this.Quantity,
                CurrentPriceId = this.CurrentPriceId,
                CategoryId = this.CategoryId,
                CategoryIdString = categoryString
            };
                return _product;
            }

        }
    }
}
