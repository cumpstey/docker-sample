namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in a request for an authentication token impersonating a specific role.
    /// </summary>
    public class GetTokenForRoleRequestDto
    {
        /// <summary>
        /// Role name
        /// </summary>
        public string Role { get; set; }
    }
}
