using System;
using System.Threading.Tasks;
using DockerSample.Api.Settings;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;

namespace DockerSample.Api.Services
{
    /// <summary>
    /// Class containing service methods for sending emails.
    /// </summary>
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _settings;

        public EmailSender(IOptions<EmailSettings> settings)
        {
            _settings = settings.Value;
        }

        /// <summary>
        /// Sends an email.
        /// </summary>
        /// <param name="to">Address to which to send the email</param>
        /// <param name="subject">Subject of the email</param>
        /// <param name="content">Content of the email</param>
        public async Task SendEmailAsync(string to, string subject, string content)
        {
            var message = new MimeMessage();
            message.To.Add(new MailboxAddress(to));
            message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromAddress));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Plain)
            {
                Text = content
            };

            using (var client = new SmtpClient())
            {
                // Remove any OAuth functionality as we won't be using it. 
                client.AuthenticationMechanisms.Remove("XOAUTH2");

                await client.ConnectAsync(_settings.SmtpServer, _settings.SmtpPort, _settings.SmtpUseSsl);

                if (!string.IsNullOrWhiteSpace(_settings.SmtpUsername) && !string.IsNullOrWhiteSpace(_settings.SmtpPassword))
                {
                    // Authenticate if credentials have been supplied.
                    await client.AuthenticateAsync(_settings.SmtpUsername, _settings.SmtpPassword);
                }

                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
