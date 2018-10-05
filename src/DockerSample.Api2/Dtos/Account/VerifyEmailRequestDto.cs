using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the parameters passed in an email verification request.
    /// </summary>
    public class VerifyEmailRequestDto
    {
        /// <summary>
        /// UserId
        /// </summary>
        [Required]
        public string UserId { get; set; }

        /// <summary>
        /// Email verification token
        /// </summary>
        [Required]
        public string Token { get; set; }
    }
}
