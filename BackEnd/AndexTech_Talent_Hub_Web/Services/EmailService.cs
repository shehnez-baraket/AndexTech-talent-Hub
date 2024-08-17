using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{
    public class EmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task<bool> SendEmailAsync(string email, string subject, string message, string senderName)
        {
                     

            try
            {
                var mailMessage = CreateMailMessage(email, subject, message, senderName);
                await SendAsync(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Erreur lors de l'envoi de l'e-mail : {ex.Message}");
            }
        }

        private MailMessage CreateMailMessage(string email, string subject, string message, string senderName)
        {
            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpSettings.Username, senderName),
                Subject = subject,
                Body = message,
                IsBodyHtml = false
            };

            mailMessage.To.Add(email);
            return mailMessage;
        }

        private async Task SendAsync(MailMessage mailMessage)
        {
            using (var smtpClient = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port))
            {
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);
                smtpClient.EnableSsl = _smtpSettings.EnableSsl;

                await smtpClient.SendMailAsync(mailMessage);
            }
        }

    }
}
