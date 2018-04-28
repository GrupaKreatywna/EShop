using Eshop.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EShop.Core.Entities
{
    public class User : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool Verified { get; set; } = false;
    }
}
