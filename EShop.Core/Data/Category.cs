using Eshop.Core.Entities;

namespace EShop.Core.Data
{
    public class Category : BaseEntity<int>
    {              
        public int? ParentId {get;set;}
        public string CategoryName{get;set;}  
        public virtual Category Parent{get;set;}
      }
}
