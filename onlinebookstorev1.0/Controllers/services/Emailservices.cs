using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace onlinebookstorev1._0.Controllers.services
{
    public class Emailservices
    {

        public static void send(string email, string subject, string emailmessage)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("newacco251@gmail.com");
                message.To.Add (new MailAddress($"{email}"));
                message.Subject = subject;
                message.IsBodyHtml = true;
                message.Body = emailmessage;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new NetworkCredential("newacco251@gmail.com", "Bookstore@123");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                Log.Information("Email has been send succesfully");
            }
            catch (Exception e)
            {
                Log.Error(e.Message);
            }
        }
    }
}
