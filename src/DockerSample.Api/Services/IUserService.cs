using DockerSample.Api.Entities;
using System;
using System.Collections.Generic;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Interface containing service methods for users and user accounts.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Checks whether a user exists with the provided credentials.
        /// </summary>
        /// <param name="email">Email address</param>
        /// <param name="password">Password</param>
        /// <returns>User details</returns>
        User Authenticate(string email, string password);

        /// <summary>
        /// Get a list of all users.
        /// </summary>
        /// <returns>Collection of user details</returns>
        IEnumerable<User> GetAll();

        /// <summary>
        /// Get a single user.
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>User details</returns>
        User GetById(Guid id);

        /// <summary>
        /// Create a new user.
        /// </summary>
        /// <param name="user">User details</param>
        /// <param name="password">Password</param>
        /// <returns>Newly created user</returns>
        User Create(User user, string password);

        /// <summary>
        /// Update details of an existing user.
        /// </summary>
        /// <param name="user">User details</param>
        /// <param name="password">Password</param>
        void Update(User user, string password = null);

        /// <summary>
        /// Delete a user.
        /// </summary>
        /// <param name="id">Identifier</param>
        void Delete(Guid id);
    }
}
