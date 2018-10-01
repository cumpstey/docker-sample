using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Gets all values
        /// </summary>
        [HttpGet("getadmin")]
        [Authorize(Roles = "Administrator")]
        public ActionResult<IEnumerable<string>> GetAdmin()
        {
            return new string[] { "value3", "value4" };
        }

        /// <summary>
        /// Gets an individual value by id
        /// </summary>
        /// <param name="id">Id</param>
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        /// <summary>
        /// Creates a new value item
        /// </summary>
        /// <param name="value">Value</param>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        /// <summary>
        /// Updates an existing value item
        /// </summary>
        /// <param name="id">Id</param>
        /// <param name="value">Value</param>
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        /// <summary>
        /// Deletes a value item
        /// </summary>
        /// <param name="id">Id</param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
