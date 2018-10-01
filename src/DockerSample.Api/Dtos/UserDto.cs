using System;

namespace DockerSample.Api.Dtos
{
    /// <summary>
    /// User details
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Email address
        /// </summary>
        public string Email { get; set; }

        public string[] Roles { get; set; }
    }
}
