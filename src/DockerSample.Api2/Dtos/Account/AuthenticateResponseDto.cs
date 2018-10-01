namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the credentials passed in an authentication request.
    /// </summary>
    public class AuthenticateResponseDto
    {
        /// <summary>
        /// JWT authentication token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// User details
        /// </summary>
        public UserDto User { get; set; }
    }
}
