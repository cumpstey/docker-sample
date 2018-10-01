using DockerSample.Api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DockerSample.Api.Helpers
{
    /// <summary>
    /// Contains methods to insert seed data into the database.
    /// </summary>
    public class DatabaseSeeder
    {
        #region Fields

        private UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="DatabaseSeeder"/> class.
        /// </summary>
        /// <param name="hasher">Password hasher</param>
        public DatabaseSeeder(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Insert sample users into the database.
        /// </summary>
        /// <param name="modelBuilder">Database model builder</param>
        public async Task SeedUsersAsync(ModelBuilder modelBuilder)
        {
            var user1 = new ApplicationUser
            {
                //Id = "efb032d2-6f61-4ee8-b6a3-94fffe625be5",
                Email = "admin@example.com",
                FirstName = "John",
                LastName = "Smith",
                //PasswordHash = hash,
                //PasswordSalt = salt,
                //Roles = new[] { adminRole },
            };
            await _userManager.CreateAsync(user1);
            await _userManager.AddPasswordAsync(user1, "thisisapassword");
            await _userManager.AddToRoleAsync(user1, "Admin");

            var user2 = new ApplicationUser
            {
                //Id = "efb032d2-6f61-4ee8-b6a3-94fffe625be5",
                Email = "user@example.com",
                FirstName = "Jim",
                LastName = "Smith",
                //PasswordHash = hash,
                //PasswordSalt = salt,
                //Roles = new[] { adminRole },
            };
            await _userManager.CreateAsync(user2);
            await _userManager.AddPasswordAsync(user2, "thisisapassword");
            //await _userManager.AddToRoleAsync(user1, "Admin");

            //var adminRole = new UserRole { Name = "Admin" };
            //var userRole = new UserRole { Name = "User" };
            //modelBuilder.Entity<UserRole>().HasData(adminRole);
            //modelBuilder.Entity<UserRole>().HasData(userRole);

            //_hasher.CreatePasswordHash("thisisapassword", out byte[] hash, out byte[] salt);

            //modelBuilder.Entity<User>().HasData(new User
            //{
            //    Id = "efb032d2-6f61-4ee8-b6a3-94fffe625be5",
            //    Email = "admin@example.com",
            //    FirstName = "John",
            //    LastName = "Smith",
            //    PasswordHash = hash,
            //    PasswordSalt = salt,
            //    //Roles = new[] { adminRole },
            //});

            //modelBuilder.Entity<User>().HasData(new User
            //{
            //    Id = "46253d9f-4c50-493a-9bb5-9fce27f1adb4",
            //    Email = "user@example.com",
            //    FirstName = "Jim",
            //    LastName = "Smith",
            //    PasswordHash = hash,
            //    PasswordSalt = salt,
            //    //Roles = new[] { userRole },
            //});
        }

        #endregion
    }
}
