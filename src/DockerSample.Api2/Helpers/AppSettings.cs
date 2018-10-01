namespace DockerSample.Api.Helpers
{
    /// <summary>
    /// Class holding application settings defined in the configuration files.
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Secret key for the JWT authentication system.
        /// </summary>
        public string Secret { get; set; }
    }
}
