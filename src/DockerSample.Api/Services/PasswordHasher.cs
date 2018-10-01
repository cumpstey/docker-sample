using System;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Class containing methods for hashing and verifying passwords.
    /// </summary>
    public class PasswordHasher : IPasswordHasher
    {
        #region Helpers

        /// <summary>
        /// Hash the provided password.
        /// </summary>
        /// <param name="password">Password</param>
        /// <param name="passwordHash">Hash of the password</param>
        /// <param name="passwordSalt">Salt used to generate the hash</param>
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace.", nameof(password));

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        /// <summary>
        /// Verify that the stored password hash matches the provided password and stored salt.
        /// </summary>
        /// <param name="password">Password</param>
        /// <param name="storedHash">Stored password hash</param>
        /// <param name="storedSalt">Stored salt</param>
        /// <returns>Whether the passwords match</returns>
        public bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(storedSalt));

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        #endregion
    }
}
