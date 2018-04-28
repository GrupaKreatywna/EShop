using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Eshop.Core.CQRS;
using EShop.Controllers.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EShop.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {

        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IConfiguration _configuration;
        public UserController(IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher, IConfiguration configuration)
        {
            _configuration = configuration;
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpPost("/api/register")]
        public async Task Register([FromBody] Register.Data data)
        {
            await _commandDispatcher.Dispatch<Register.Command>(new Register.Command()
            {
                _data = data
            });
        }
        
        [HttpPost("/api/login")]
        public async Task<object> Login([FromBody] Login.Query data)
        {
            bool result = await _queryDispatcher.Dispatch<Login.Query, bool>(data);
            if(result)
            {
                return GenerateJwtToken(data.Email);
            }
            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
        }

        private string GenerateJwtToken(string email)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"]));

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}