using System;
using System.Collections.Generic;
using System.Text;
using Eshop.Core.Entities;

namespace EShop.Core.Entities
{
    public class Order : BaseEntity<int>
    {
        
        public DateTime OrderDate { get; set; }
        public string Adress { get; set; }
        public string ContractingAuthority { get; set; }
        public string City { get; set; }
        public  string PostalCode { get; set; }
        //public int DiscountCouponId {get;set;}
        //public DiscountCoupon DiscountCoupon {get;set;}
    }
}
