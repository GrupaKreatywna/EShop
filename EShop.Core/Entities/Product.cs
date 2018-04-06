
using System.Collections.Generic;
using Eshop.Core.Entities;

namespace EShop.Core.Entities
{
    public class Product : BaseEntity<int>
    {
        public string Name{get;set;}
        public string Picture{get;set;}
        public string Description{get;set;}
        public string Tags{get;set;}
        public int Count{get;set;}
        public ICollection<Price> Prices{get;set;}

        //public virtual Category Category{get;set;}                   
    }
}