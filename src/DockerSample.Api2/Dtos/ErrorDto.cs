using System;
using System.Collections.Generic;
using DockerSample.Api.Services;

namespace System.Collections.Generic
{
    /// <summary>
    /// Errors generated in a failed request
    /// </summary>
    public class ErrorDto
    {
        #region Fields

        public const string EmailNotVerified = "EmailNotVerified";

        public const string UserNotFound = "UserNotFound";

        #endregion

        public ErrorDto()
        {
            Errors = new Dictionary<string, IList<ErrorDetailDto>>();
        }

        public ErrorDto(string code, string description)
            : this()
        {
            Errors.AddItem(string.Empty, new ErrorDetailDto(code, description));
        }

        public IDictionary<string, IList<ErrorDetailDto>> Errors { get; private set; }

        public class ErrorDetailDto
        {
            public ErrorDetailDto(string code, string description)
            {
                Code = code;
                Description = description;
            }

            /// <summary>
            /// Code
            /// </summary>
            public string Code { get; private set; }

            /// <summary>
            /// Description
            /// </summary>
            public string Description { get; private set; }
        }
    }
}
