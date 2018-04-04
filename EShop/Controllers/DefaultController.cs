using Eshop.Core.Data;
using Microsoft.AspNetCore.Mvc;

namespace EShop.Controllers
{
    public class DefaultController : Controller
    {
        private IUnitOfWork _uow;

        public DefaultController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [Route(""), HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult RedirectToSwaggerUi()
        {
            return Redirect("/swagger");
        }
    }
}