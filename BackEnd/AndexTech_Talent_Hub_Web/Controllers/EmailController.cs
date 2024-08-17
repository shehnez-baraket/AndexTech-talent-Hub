using AndexTech_Talent_Hub_Bibliotheque.Models;
using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace AndexTech_Talent_Hub_Web.Services
{/*
    public class EmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task<Result> SendEmailAsync(string email, string subject, string message, string senderName, bool isHtml = false, List<string> attachments = null)
        {
            try
            {
                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(subject) || string.IsNullOrEmpty(message))
                {
                    return Result.Fail("Les paramètres email, sujet et message sont obligatoires.");
                }

                if (!IsValidEmail(email))
                {
                    return Result.Fail("L'adresse e-mail du destinataire n'est pas valide.");
                }

                using (var smtpClient = new SmtpClient(_smtpSettings.Server, _smtpSettings.Port))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(_smtpSettings.Username, _smtpSettings.Password);
                    smtpClient.EnableSsl = _smtpSettings.EnableSsl;

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.Username, senderName),
                        Subject = subject,
                        Body = message,
                        IsBodyHtml = isHtml
                    };

                    mailMessage.To.Add(email);

                    if (attachments != null)
                    {
                        foreach (var attachment in attachments)
                        {
                            mailMessage.Attachments.Add(new Attachment(attachment));
                        }
                    }

                    await smtpClient.SendMailAsync(mailMessage);

                    return Result.Success("Email envoyé avec succès");
                }
            }
            catch (Exception ex)
            {
                return Result.Fail($"Erreur lors de l'envoi de l'e-mail : {ex.Message}");
            }
        }

        public bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

    }

    public class Result
    {
        public bool IsSuccess { get; }
        public string Message { get; }

        private Result(bool isSuccess, string message)
        {
            IsSuccess = isSuccess;
            Message = message;
        }

        public static Result Success(string message)
        {
            return new Result(true, message);
        }

        public static Result Fail(string message)
        {
            return new Result(false, message);
        }
    }*/
}
