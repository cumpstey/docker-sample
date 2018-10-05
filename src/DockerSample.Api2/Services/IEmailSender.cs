using System.Threading.Tasks;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Interface containing service methods for sending emails.
    /// </summary>
    public interface IEmailSender
    {
        /// <summary>
        /// Sends an email.
        /// </summary>
        /// <param name="email">Address to which to send the email</param>
        /// <param name="subject">Subject of the email</param>
        /// <param name="message">Content of the email</param>
        Task SendEmailAsync(string email, string subject, string message);
    }
}
