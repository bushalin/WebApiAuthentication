using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportManagement.Model.Reports;
using ReportManagement.Services.Reports;

namespace ReportManagement.Controllers.ReportControllers
{
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        private readonly IReportServices _services;

        public ReportController()
        {
            _services = new ReportServices();
        }


        [Authorize]
        [Route("GetReportByName/{username}")]
        [HttpGet]
        public IHttpActionResult GetReportByName(string username)
        {
            return Ok(_services.GetReportByName(username).Data);
        }
    }
}
