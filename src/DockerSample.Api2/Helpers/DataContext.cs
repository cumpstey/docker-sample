﻿using DockerSample.Api.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DockerSample.Api.Helpers
{
    /// <summary>
    /// Data context.
    /// </summary>
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructor

        /// <summary>
        /// Initialises a new instance of the <see cref="DataContext"/> class.
        /// </summary>
        /// <param name="options"></param>
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        #endregion
    }
}
