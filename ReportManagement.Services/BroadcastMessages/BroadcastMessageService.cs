using ReportManagement.Model;
using ReportManagement.Model.BroadcastMessages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ReportManagement.Services.BroadcastMessages
{
    public class BroadcastMessageService : IBroadcastMessageService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEntityService<Broadcast_Message> _services;

        public BroadcastMessageService()
        {
            _context = new ApplicationDbContext();
            _services = new EntityService<Broadcast_Message>(_context);
        }

        public JsonResult GetRecentMessages()
        {
            var message = "";

            var result = _context.UserInfo.Select(x => new
            {
                x.UserId,
                x.FirstName,
                x.LastName
            }).Join(_context.BroadcastMessage,
            u => u.UserId,
            v => v.UserId,
            (u, v) => new { User = u, Message = v })
            .Select(x => new
            {
                x.User.UserId,
                x.User.FirstName,
                x.User.LastName,
                x.Message.CreatedDate,
                MessageId = x.Message.id,
                x.Message.MessageTitle,
                x.Message.MessageBody
            }).ToList()
            .OrderByDescending(x => x.CreatedDate);

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult SaveBroadcastMessage(Broadcast_Message messageObj)
        {
            var message = "";

            if(String.IsNullOrEmpty(messageObj.UserId))
            {
                message = "Please provide userId";
                return new JsonResult
                {
                    Data = message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            try
            {
                _services.Save(messageObj);
                _services.SaveChanges();
                message = "Message Saved Successfully";
            }
            catch(Exception ex)
            {
                message = ex.Message;
            }

            return new JsonResult
            {
                Data = message,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }

    public interface IBroadcastMessageService
    {
        JsonResult GetRecentMessages();
        JsonResult SaveBroadcastMessage(Broadcast_Message messageObj);
    }
}
