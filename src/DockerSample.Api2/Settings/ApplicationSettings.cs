using System;

namespace DockerSample.Api.Settings
{
    /// <summary>
    /// Class holding application settings defined in the configuration files.
    /// </summary>
    public class ApplicationSettings
    {
        public string ConnectionString { get; set; }

        /// <summary>
        /// Secret key for the JWT authentication system.
        /// </summary>
        public string JwtSecret { get; set; }

        public Uri FrontEndUri { get; set; }
    }
}
