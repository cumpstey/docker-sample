using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an authentication request.
    /// </summary>
    public class AuthenticateWith2faRequestDto
    {
        public string Code { get; set; }

        public bool RememberMachine { get; set; }
    }
}
