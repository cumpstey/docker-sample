using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DockerSample.Api.Middleware
{
    public class ErrorHandlingMiddleware
    {
        #region Fields

        private readonly RequestDelegate next;

        #endregion

        #region Constructor

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        #endregion

        #region Methods

        public async Task Invoke(HttpContext context /* other dependencies */)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        #endregion

        #region Helpers

        private async static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = StatusCodes.Status500InternalServerError;

            // Add in handling of any custom exceptions here if necessary.
            ////if (exception is MyNotFoundException) code = HttpStatusCode.NotFound;
            ////else if (exception is MyUnauthorizedException) code = HttpStatusCode.Unauthorized;
            ////else if (exception is MyException) code = HttpStatusCode.BadRequest;

            var result = new ObjectResult(new
            {
                exception.Message,
                exception.StackTrace,
            })
            {
                StatusCode = statusCode,
            };

            // By creating an action context in which to execute an ObjectResult result, we ensure it
            // uses the same serializer settings as results created by other means.
            var routeData = context.GetRouteData();
            var actionDescriptor = new ActionDescriptor();
            var actionContext = new ActionContext(context, routeData, actionDescriptor);

            await result.ExecuteResultAsync(actionContext);
        }

        #endregion
    }
}
