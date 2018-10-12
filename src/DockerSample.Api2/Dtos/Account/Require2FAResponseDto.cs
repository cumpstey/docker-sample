namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the information returned from a successful authentication request.
    /// </summary>
    public class Require2FAResponseDto
    {
        public Require2FAResponseDto()
        {
            Require2FA = true;
        }

        public bool Require2FA { get; private set; }
    }
}
