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

                var result = await _uow.CategoryRepository.Query().Select(x => new TreeNode()
                {
                    ID = x.Id,
                    CategoryName = x.CategoryName,
                    Children = _uow.CategoryRepository.Query().Where(child => child.ParentId != null).Where(child => child.ParentId == x.Id).Select(child => new TreeNode()
                    {
                        ID = child.Id,
                        CategoryName = child.CategoryName
                    }).ToList()
                }
                ).ToListAsync();
                return result;
            }

        }

        public class TreeNode
        {
            public int ID { get; set; }
            public List<TreeNode> Children;
            public string CategoryName { get; set; }
        }
    }
}
