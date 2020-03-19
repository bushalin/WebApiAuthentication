using Newtonsoft.Json.Linq;
using ReportManagement.Model.Reports;
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

        [Route("GetReportById/{reportId}")]
        [HttpGet]
        public IHttpActionResult GetReportById(int reportId)
        {
            return Ok(_reportServices.GetReportById(reportId).Data);
        }

        // URL: api/Report/GetReportByName?username=something
        [Route("GetReportByUserName")]
        [HttpGet]
        public IHttpActionResult GetReportByName(string username)
        {
            return Ok(_reportServices.GetReportByUserName(username).Data);
        }

        // URL: api/Report/SearchReport?employeeId=something&createdDate=1324-234-14
        [Route("SearchReport")]
        [HttpGet]
        public IHttpActionResult SearchReport(string createdDate = null, string employeeId = null)
        {
            System.DateTime parsedDate;
            bool convertSuccess = System.DateTime.TryParse(createdDate, out parsedDate);
            if(parsedDate == System.DateTime.MinValue)
            {
                return Ok(_reportServices.SearchReportByEmployeeId(employeeId).Data);
            }

            return Ok(_reportServices.SearchReport(employeeId, parsedDate).Data);
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

        [Route("UpdateRemarks")]
        [HttpPatch]
        public IHttpActionResult UpdateRemarks(Report reportObj)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_reportServices.UpdateRemarks(reportObj).Data);
        }

        [Route("CheckReport")]
        [HttpGet]
        public IHttpActionResult CheckReport(string dateParam)
        {
            System.DateTime parsedDate;
            bool convertSuccess = System.DateTime.TryParse(dateParam, out parsedDate);
            return Ok(_reportServices.ReportCheckData(parsedDate).Data);
        }
    }
}
