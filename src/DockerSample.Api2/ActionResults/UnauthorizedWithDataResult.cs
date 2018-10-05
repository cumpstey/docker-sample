using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DockerSample.Api.ActionResults
{
    public class UnauthorizedWithDataResult : UnauthorizedResult
    {
        private readonly object _data;

        public UnauthorizedWithDataResult(object data)
        {
            _data = data;
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            // This sets the status code
            await base.ExecuteResultAsync(context);

            if (_data != null)
            {
                context.HttpContext.Response.ContentType = "application/json";

                // Write the data to the body
                var message = JsonConvert.SerializeObject(_data);
                var bytes = Encoding.UTF8.GetBytes(message);
                await context.HttpContext.Response.Body.WriteAsync(bytes, 0, bytes.Length);
                await context.HttpContext.Response.Body.FlushAsync();
            }
        }
    }
}
