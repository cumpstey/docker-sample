using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class EnableAuthenticatorRequestDto
    {
        public string Code { get; set; }
    }
}
