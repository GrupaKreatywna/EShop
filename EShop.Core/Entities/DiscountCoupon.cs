using System;
using System.Collections.Generic;
using System.Text;
using Eshop.Core.Entities;

namespace EShop.Core.Entities
{
    public class DiscountCoupon : BaseEntity<int>
    {
        public string Name { get; set; }

        public int CouponCode { get; set; }

        public DateTime ValidationStart { get; set; }

        public DateTime ValidationEnd { get; set; }

        //public ICollection<Order> Orders { get; set; }
    }
}