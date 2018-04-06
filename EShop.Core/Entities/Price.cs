

using Eshop.Core.Entities;
using System;

namespace EShop.Core.Entities
{
    public class Price : BaseEntity<int>
    {
        public decimal Value{get;set;}
        public DateTime StartDate{get;set;}
        public DateTime? EndDate{get;set;}
        public virtual Product Product{get;set;}
    }
}