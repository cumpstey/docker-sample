using System.Collections.Generic;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class User2faEnabledResponseDto : User2faStatusResponseDto
    {
        /// <summary>
        /// Unused recovery codes for the user
        /// </summary>
        public IEnumerable<string> RecoveryCodes { get; set; }
    }
}
