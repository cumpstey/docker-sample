using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DockerSample.Api.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DockerSample.Api.Controllers
{
    [Route(ApiRoot + "values")]
    public class ValuesController : BaseApiController
    {
        /// <summary>
        /// Gets all values
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "This endpoint is publicly accessible" };
        }

        /// <summary>
        /// Gets all values
        /// </summary>
        [HttpGet("any-user")]
        [Authorize]
        public ActionResult<IEnumerable<string>> GetAnyUser()
        {
            return new string[] { "This endpoint is accessible to all authenticated users" };
        }

        /// <summary>
        /// Gets all values
        /// </summary>
        [HttpGet("admin-only")]
        [Authorize(Roles = Roles.Administrator)]
        public ActionResult<IEnumerable<string>> GetAdmin()
        {
            return new string[] { "This endpoint is accessible only to users in the Administrator role" };
        }
    }
}
