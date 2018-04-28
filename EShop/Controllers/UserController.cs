using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.User;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;
        public UserController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("")]
        public async Task Register([FromBody] Register.Data data)
        {
            await _commandDispatcher.Dispatch<Register.Command>(new Register.Command()
            {
                _data = data
            });
        }
    }
}