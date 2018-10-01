using System;
using Microsoft.AspNetCore.Identity;

namespace DockerSample.Api.Entities
{
    /// <summary>
    /// Class representing the user details stored in the database.
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        ///// <summary>
        ///// Identifier
        ///// </summary>
        //public Guid Id { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }

        ///// <summary>
        ///// Email address
        ///// </summary>
        //public string Email { get; set; }

        ///// <summary>
        ///// Hash of password
        ///// </summary>
        //public byte[] PasswordHash { get; set; }

        ///// <summary>
        ///// Salt used in hashing password
        ///// </summary>
        //public byte[] PasswordSalt { get; set; }

        //public UserRole[] Roles { get; set; }
    }
}
