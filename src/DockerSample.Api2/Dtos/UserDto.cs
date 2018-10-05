using System;

namespace DockerSample.Api.Dtos
{
    /// <summary>
    /// User details
    /// </summary>
    public class UserDto
    {
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

        /// <summary>
        /// Roles to which this user is assigned
        /// </summary>
        public string[] Roles { get; set; }
    }
}
