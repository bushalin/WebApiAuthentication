using Newtonsoft.Json.Linq;
using ReportManagement.Services.Reports;
using System.Web.Http;

namespace ReportManagement.Controllers.ReportControllers
{
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        private readonly IReportServices _reportServices;
        private readonly IReportDetailServices _reportDetailServices;

        public ReportController()
        {
            _reportServices = new ReportServices();
            _reportDetailServices = new ReportDetailServices();
        }

        // URL: api/Report/GetReportByName?username=something
        [Route("GetReportByName")]
        [HttpGet]
        public IHttpActionResult GetReportByName(string username)
        {
            return Ok(_reportServices.GetReportByName(username).Data);
        }

        // URL: api/Report/GetReportById/1dd77da5-8a67-4729-923c-3224bbccf460
        [Route("GetReportById/{id:guid}")]
        [HttpGet]
        public IHttpActionResult GetReportById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.GetReportById(id).Data);
        }

        // URL: api/Report/SaveReport
        [Route("SaveReport")]
        [HttpPost]
        public IHttpActionResult SaveReport(JObject obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.SaveReport(obj).Data);
        }
    }
}
