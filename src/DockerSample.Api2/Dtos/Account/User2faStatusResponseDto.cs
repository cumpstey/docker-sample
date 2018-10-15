using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class User2faStatusResponseDto
    {
        ////public bool HasAuthenticator { get; set; }

        /// <summary>
        /// Whether two factor authentication is enabled for the user
        /// </summary>
        public bool Is2faEnabled { get; set; }

        /// <summary>
        /// Number of unused recovery codes remaining for the user
        /// </summary>
        public int RecoveryCodesLeft { get; set; }
    }
}
