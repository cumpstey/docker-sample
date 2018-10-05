namespace DockerSample.Api.Settings
{
    /// <summary>
    /// Class holding email-specific application settings defined in the configuration files.
    /// </summary>
    public class EmailSettings
    {
        public string SmtpServer { get; set; }

        public int SmtpPort { get; set; }

        public bool SmtpUseSsl { get; set; }

        public string SmtpUsername { get; set; }

        public string SmtpPassword { get; set; }

        public string FromName { get; set; }

        public string FromAddress { get; set; }
    }
}
