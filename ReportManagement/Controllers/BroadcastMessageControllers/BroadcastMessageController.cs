using ReportManagement.Model.BroadcastMessages;
using ReportManagement.Services.BroadcastMessages;
using System.Web.Http;

namespace ReportManagement.Controllers.BroadcastMessageControllers
{
    [RoutePrefix("v1/Broadcast")]
    public class BroadcastMessageController : ApiController
    {
        private readonly IBroadcastMessageService _services;

        public BroadcastMessageController()
        {
            _services = new BroadcastMessageService();
        }

        [HttpGet]
        [Route("GetRecentMessages")]
        public IHttpActionResult GetRecentMessages()
        {
            return Ok(_services.GetRecentMessages().Data);
        }

        [HttpPost]
        [Route("SaveBroadcastMessage")]
        public IHttpActionResult SaveBroadcastMessage(Broadcast_Message messageObj)
        {
            return Ok(_services.SaveBroadcastMessage(messageObj).Data);
        }
    }
}