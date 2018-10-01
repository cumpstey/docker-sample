using System.ComponentModel.DataAnnotations;

namespace DockerSample.Api.Entities
{
    /// <summary>
    /// Class representing the user role details stored in the database.
    /// </summary>
    public class UserRole
    {
        /// <summary>
        /// Identifier
        /// </summary>
        [Key]
        public string Name { get; set; }
    }
}
