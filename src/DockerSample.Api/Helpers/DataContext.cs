﻿using DockerSample.Api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DockerSample.Api.Helpers
{
    /// <summary>
    /// Data context.
    /// </summary>
    public class DataContext : DbContext //IdentityDbContext<User> //
    {
        #region Fields

        private DatabaseSeeder _seeder;

        #endregion

        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="DataContext"/> class.
        /// </summary>
        /// <param name="options"></param>
        /// <param name="seeder">Database seeder</param>
        public DataContext(DbContextOptions<DataContext> options, DatabaseSeeder seeder)
            : base(options)
        {
            _seeder = seeder;
        }

        #endregion

        #region Properties

        /// <summary>
        /// The collection of <see cref="User"/> entities held in the database.
        /// </summary>
        public DbSet<User> Users { get; set; }

        #endregion

        /// <summary>
        /// Perform actions required when building the model, such as inserting seed data.
        /// </summary>
        /// <param name="modelBuilder">Database model builder</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            _seeder.SeedUsers(modelBuilder);
        }
    }
}
