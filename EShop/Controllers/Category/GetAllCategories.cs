using Eshop.Core.CQRS;
using Eshop.Core.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EShop.Controllers.Category
{
    public class GetAllCategories
    {
        public class Query : IQuery
        {
            public Query()
            {
            }
        }
        public class Handler : IQueryHandler<Query, List<TreeNode>>
        {
            private readonly IUnitOfWork _uow;
            public Handler(IUnitOfWork uow)
            {
                _uow = uow;
            }

            public async Task<List<TreeNode>> Handle(Query query)
            {

                var all = await _uow.CategoryRepository.Query().Select(x => new TreeNode
                {
                    ID = x.Id,
                    ParentId = x.ParentId,
                    CategoryName = x.CategoryName
                }).ToListAsync();
                var result = new List<TreeNode>();
                foreach (var item in all)
                {
                    item.Children = new List<TreeNode>();
                }
                foreach (var child in all)
                {
                    if (child.ParentId == null)
                    {
                        result.Add(child);
                        continue;
                    }

                    all.FirstOrDefault(x => x.ID == child.ParentId).Children.Add(child);
                }
                return result;
            }

           

        }

        public class TreeNode
        {
            public int ID { get; set; }
            public int? ParentId { get; set; }
            public List<TreeNode> Children { get; set; }
            public string CategoryName { get; set; }
        }
    }
}
