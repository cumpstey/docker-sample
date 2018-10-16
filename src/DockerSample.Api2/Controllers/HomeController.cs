using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using AutoMapper;
using DockerSample.Api.Dtos;
using DockerSample.Api.Dtos.Account;
using DockerSample.Api.Entities;
using DockerSample.Api.Services;
using DockerSample.Api.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DockerSample.Api.Controllers
{
    [Route("")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class HomeController : BaseApiController
    {
        #region Action methods

        /// <summary>
        /// Returns api information.
        /// </summary>
        /// <response code="200">Success</response>
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Get()
        {
            return Ok(new
            {
                Description = "A sample api",
                ApiRoot,
            });
        }

        #endregion
    }
}
