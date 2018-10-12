using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class EnableAuthenticatorResponseDto
    {
        public string SharedKey { get; set; }

        public string AuthenticatorUrl { get; set; }
    }
}
