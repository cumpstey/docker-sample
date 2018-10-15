using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DockerSample.Api.ActionResults
{
    /// <summary>
    /// An <see cref="ObjectResult"/> that when executed will produce a Unauthorized (401) response.
    /// </summary>
    public class UnauthorizedObjectResult : ObjectResult
    {
        private const int DefaultStatusCode = StatusCodes.Status401Unauthorized;

        /// <summary>
        /// Creates a new <see cref="UnauthorizedObjectResult"/> instance.
        /// </summary>
        /// <param name="error">Contains the errors to be returned to the client.</param>
        public UnauthorizedObjectResult(object error)
            : base(error)
        {
            StatusCode = DefaultStatusCode;
        }

        /// <summary>
        /// Creates a new <see cref="UnauthorizedObjectResult"/> instance.
        /// </summary>
        /// <param name="modelState"><see cref="ModelStateDictionary"/> containing the validation errors.</param>
        public UnauthorizedObjectResult(ModelStateDictionary modelState)
            : base(new SerializableError(modelState))
        {
            if (modelState == null)
            {
                throw new ArgumentNullException(nameof(modelState));
            }

            StatusCode = DefaultStatusCode;
        }
    }
}
