using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.Category;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public CategoryController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet("/api/Category/{id}")]
        public async Task<GetCategory.Result> Get(int id)
        {
            return await _queryDispatcher.Dispatch<GetCategory.Query, GetCategory.Result>(new GetCategory.Query(id));
        }

        [HttpGet("/api/Categories")]
        public async Task<List<GetAllCategories.TreeNode>> GetAll()
        {
            return await _queryDispatcher.Dispatch<GetAllCategories.Query, List<GetAllCategories.TreeNode>>(new GetAllCategories.Query());
        }
        

        [HttpPost("")]
        public async Task Create(int? parentId, string categoryName)
        {
            await _commandDispatcher.Dispatch<CreateCategory.Command>(new CreateCategory.Command()
            {
                _data = new CreateCategory.Data(parentId,categoryName)
            });
        }

    }
}