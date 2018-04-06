
using System.Collections.Generic;
using Eshop.Core.Entities;

namespace EShop.Core.Entities
{
    public class Product : BaseEntity<int>
    {
        string Name{get;set;}
        string Picture{get;set;}
        string Description{get;set;}
        string Tags{get;set;}
        int Count{get;set;}
        public ICollection<Price> Prices{get;set;}

        //public virtual Category Category{get;set;}                   
    }
}