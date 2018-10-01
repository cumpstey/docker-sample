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
    }
}
