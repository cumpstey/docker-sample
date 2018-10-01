using DockerSample.Api.Entities;
using DockerSample.Api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Class containing service methods for users and user accounts.
    /// </summary>
    public class UserService : IUserService
    {
        #region Fields

        private DataContext _context;

        private IPasswordHasher _hasher;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="UserService"/> class.
        /// </summary>
        /// <param name="context">Data context</param>
        /// <param name="hasher">Password hasher</param>
        public UserService(DataContext context, IPasswordHasher hasher)
        {
            _context = context;
            _hasher = hasher;

            _context.Database.EnsureCreated();
        }

        #endregion

        #region Methods

        /// <summary>
        /// Checks whether a user exists with the provided credentials.
        /// </summary>
        /// <param name="email">Email address</param>
        /// <param name="password">Password</param>
        /// <returns>User details</returns>
        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return null;
            }

            // Get user with the provided email address
            var user = _context.Users.SingleOrDefault(x => x.Email == email);

            // Check if user exists
            if (user == null)
            {
                return null;
            }

            // Check if password is correct
            if (!_hasher.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            // Authentication successful
            return user;
        }

        /// <summary>
        /// Get a list of all users.
        /// </summary>
        /// <returns>Collection of user details</returns>
        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        /// <summary>
        /// Get a single user.
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>User details</returns>
        public User GetById(Guid id)
        {
            return _context.Users.Find(id);
        }

        /// <summary>
        /// Create a new user.
        /// </summary>
        /// <param name="user">User details</param>
        /// <param name="password">Password</param>
        /// <returns>Newly created user</returns>
        public User Create(User user, string password)
        {
            // Validation of required fields etc.
            // TODO: Need to add in validation of required name fields etc.
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new AppException("Password is required");
            }

            if (_context.Users.Any(x => x.Email == user.Email))
            {
                throw new AppException($"User already exists with email address {user.Email}.");
            }

            // Hash password
            _hasher.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Save user
            _context.Users.Add(user);
            _context.SaveChanges();

            // TODO: Need to add step to verify email address is owned by the user.
            return user;
        }

        /// <summary>
        /// Update details of an existing user.
        /// </summary>
        /// <param name="details">User details</param>
        /// <param name="password">Password</param>
        public void Update(User details, string password = null)
        {
            var user = _context.Users.Find(details.Id);

            // Check user exists
            if (user == null)
            {
                throw new AppException("User not found");
            }

            if (details.Email != user.Email)
            {
                // Email address has changed so need to check if the new email address is already taken.
                // TODO: Need to add step to verify email address is owned by the user.
                if (_context.Users.Any(x => x.Email == details.Email))
                {
                    throw new AppException($"User already exists with email address {user.Email}.");
                }
            }

            // Update user properties
            user.FirstName = details.FirstName;
            user.LastName = details.LastName;
            user.Email = details.Email;

            // Update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                _hasher.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            // Update user
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        /// <summary>
        /// Delete a user.
        /// </summary>
        /// <param name="id">Identifier</param>
        public void Delete(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        #endregion
    }
}
