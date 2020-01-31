using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using ReportManagement.Model.Reports;
using ReportManagement.Services.Reports;

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


        [Authorize]
        [Route("GetReportByName/{username}")]
        [HttpGet]
        public IHttpActionResult GetReportByName(string username)
        {
            return Ok(_reportServices.GetReportByName(username).Data);
        }

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
