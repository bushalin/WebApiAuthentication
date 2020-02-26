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
        [Route("GetReportByUserName")]
        [HttpGet]
        public IHttpActionResult GetReportByName(string username)
        {
            return Ok(_reportServices.GetReportByUserName(username).Data);
        }

        // URL: api/Report/GetReportById/1dd77da5-8a67-4729-923c-3224bbccf460
        [Route("GetReportByUserId/{id:guid}")]
        [HttpGet]
        public IHttpActionResult GetReportById(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.GetReportByUserId(id).Data);
        }

        // URL: api/Report/GetAllReports/
        [Route("GetAllReports")]
        [HttpGet]
        public IHttpActionResult GetAllReports()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.GetAllReports().Data);
        }

        // URL: api/Report/GetRecentReports/
        [Route("GetRecentReports")]
        [HttpGet]
        public IHttpActionResult GetRecentReports()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.GetRecentReports().Data);
        }

        // URL: api/Report/SaveReport
        [Route("SaveReport")]
        [HttpPost]
        public IHttpActionResult SaveReport([FromBody]JObject obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.SaveReport(obj).Data);
        }
    }
}
