﻿using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Dtos.Account
{
    /// <summary>
    /// Class representing the credentials passed in an authentication request.
    /// </summary>
    public class RegisterRequestDto
    {
        /// <summary>
        /// First name
        /// </summary>
        [Required]
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        [Required]
        public string LastName { get; set; }

        /// <summary>
        /// Email address
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [Required]
        [MinLength(10)]
        public string Password { get; set; }

        /// <summary>
        /// Register to the Administrator role
        /// </summary>
        public bool IsAdmin { get; set; }
    }
}
