namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the information returned from a successful authentication request.
    /// </summary>
    public class AuthenticatedResponseDto
    {
        /// <summary>
        /// JWT authentication token
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// Prompt the user to register for two factor authentication
        /// </summary>
        public bool PromptToRegister2FA { get; set; }
    }
}
