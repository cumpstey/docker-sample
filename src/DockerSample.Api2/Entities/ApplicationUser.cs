using System;
using Microsoft.AspNetCore.Identity;

namespace DockerSample.Api.Entities
{
    /// <summary>
    /// Class representing the user details stored in the database.
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
        /// User has chosen not to set up two factor authentication; do not prompt to do this
        /// </summary>
        public bool No2FAPrompt { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }
    }
}
