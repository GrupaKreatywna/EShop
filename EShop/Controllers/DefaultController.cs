using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace EShop.Controllers
{
    public class DefaultController : Controller
    {
        [Route(""), HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult RedirectToSwaggerUi()
        {
            return Redirect("/swagger");
        }
    }
}