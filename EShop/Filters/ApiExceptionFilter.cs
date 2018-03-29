using Eshop.Core.Services.Logging;
using Eshop.Models;
using FluentValidation;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Text;

namespace Eshop.Filters
{
    public class ApiExceptionAttribute : ExceptionFilterAttribute
    {
        private ILogger _logger;

        public ApiExceptionAttribute(ILogger logger)
        {
            _logger = logger;
        }

        public override void OnException(ExceptionContext filterContext)
        {
            if (filterContext.Exception is ValidationException)
            {
                var exception = filterContext.Exception as ValidationException;
                filterContext.HttpContext.Response.StatusCode = 400;
                filterContext.Result = new JsonResult(new ValidationResultModel(exception));
                return;
            }

            var exceptionId = Guid.NewGuid();
            filterContext.HttpContext.Response.StatusCode = 500;
            var sb = new StringBuilder();
            sb.AppendLine("ErrorId: " + exceptionId);
            sb.AppendLine(filterContext.HttpContext.Request.GetDisplayUrl());
            sb.AppendLine();
            //filterContext.HttpContext.Request..Values.ForEach(parameter => sb.Append($"{parameter.Key} = {parameter.Value}").AppendLine());
            sb.AppendLine();
            sb.Append(filterContext.Exception);

            _logger.Error(sb.ToString());

            filterContext.Result = new ContentResult() { Content = exceptionId.ToString() };
        }
    }
}