using DockerSample.Api.ActionResults;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DockerSample.Api.Controllers
{
    /// <summary>
    /// Base controller for the api.
    /// </summary>
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        #region Fields

        /// <summary>
        /// Root url for the api based on this controller
        /// </summary>
        public const string ApiRoot = "api/v1/";

        #endregion

        #region Result helpers

        /// <summary>
        /// Creates an <see cref="UnauthorizedObjectResult"/> that produces a <see cref="StatusCodes.Status401Unauthorized"/> response.
        /// </summary>
        /// <param name="error">An error object to be returned to the client.</param>
        /// <returns>The created <see cref="UnauthorizedObjectResult"/> for the response.</returns>
        [NonAction]
        public virtual UnauthorizedObjectResult Unauthorized(object error)
            => new UnauthorizedObjectResult(error);

        #endregion
    }
}
