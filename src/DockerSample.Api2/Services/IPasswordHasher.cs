using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Interface containing methods for hashing and verifying passwords.
    /// </summary>
    public interface IPasswordHasher
    {
        /// <summary>
        /// Hash the provided password.
        /// </summary>
        /// <param name="password">Password</param>
        /// <param name="passwordHash">Hash of the password</param>
        /// <param name="passwordSalt">Salt used to generate the hash</param>
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);

        /// <summary>
        /// Verify that the stored password hash matches the provided password and stored salt.
        /// </summary>
        /// <param name="password">Password</param>
        /// <param name="storedHash">Stored password hash</param>
        /// <param name="storedSalt">Stored salt</param>
        /// <returns>Whether the passwords match</returns>
        bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
    }
}
