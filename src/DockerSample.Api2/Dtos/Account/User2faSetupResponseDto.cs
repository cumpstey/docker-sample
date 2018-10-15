using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class User2faSetupResponseDto
    {
        /// <summary>
        /// Shared key which can be manually input into an authenticator app
        /// </summary>
        public string SharedKey { get; set; }

        /// <summary>
        /// Url which can be used to generate a QR code to be scanned by an authenticator app
        /// </summary>
        public string AuthenticatorUrl { get; set; }
    }
}
