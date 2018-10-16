using DockerSample.Api.Entities;
using Microsoft.AspNetCore.Identity;
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

        private RoleManager<IdentityRole> _roleManager;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="DatabaseSeeder"/> class.
        /// </summary>
        /// <param name="roleManager">Role manager</param>
        /// <param name="userManager">User manager</param>
        public DatabaseSeeder(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Seeds the database with the roles used by the application.
        /// </summary>
        public async Task SeedRolesAsync()
        {
            await EnsureRoleExists(Roles.Administrator);
            await EnsureRoleExists(Roles.Manager);
        }

        /// <summary>
        /// Seeds the database with some dummy users in the various roles.
        /// </summary>
        public async Task SeedUsersAsync()
        {
            // Create admin user, email confirmed, no 2FA
            var admin = new ApplicationUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                FirstName = "Bob",
                LastName = "Jones",
                EmailConfirmed = true,
                TwoFactorEnabled = false,
            };
            var adminResult = await _userManager.CreateAsync(admin, "Password[1]");
            if (adminResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(admin, Roles.Administrator);
                await _userManager.AddToRoleAsync(admin, Roles.Manager);
            }

            // Create manager user, email confirmed, no 2FA
            var manager = new ApplicationUser
            {
                UserName = "manager@example.com",
                Email = "manager@example.com",
                FirstName = "Bill",
                LastName = "Brown",
                EmailConfirmed = true,
                TwoFactorEnabled = false,
            };
            var managerResult = await _userManager.CreateAsync(manager, "Password[1]");
            if (managerResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(manager, Roles.Manager);
            }

            // Create standard user, email confirmed, no 2FA
            var user1 = new ApplicationUser
            {
                UserName = "user1@example.com",
                Email = "user1@example.com",
                FirstName = "John",
                LastName = "Smith",
                EmailConfirmed = true,
                TwoFactorEnabled = false,
            };
            var user1Result = await _userManager.CreateAsync(user1, "Password[1]");


            // Create standard user, email not confirmed, no 2FA
            var user2 = new ApplicationUser
            {
                UserName = "user2@example.com",
                Email = "user2@example.com",
                FirstName = "John",
                LastName = "Smith",
                EmailConfirmed = false,
                TwoFactorEnabled = false,
            };
            var user2Result = await _userManager.CreateAsync(user2, "Password[1]");


            // Create standard user, email confirmed, 2FA enabled
            var user3 = new ApplicationUser
            {
                UserName = "user3@example.com",
                Email = "user3@example.com",
                FirstName = "John",
                LastName = "Smith",
                EmailConfirmed = true,
                TwoFactorEnabled = true,
            };
            var user3Result = await _userManager.CreateAsync(user3, "Password[1]");
        }

        #endregion

        #region Helpers

        private async Task EnsureRoleExists(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                var role = new IdentityRole(roleName);
                var result = await _roleManager.CreateAsync(role);
            }
        }

        #endregion
    }
}
