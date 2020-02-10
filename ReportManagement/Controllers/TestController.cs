using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReportManagement.Services;

namespace ReportManagement.Controllers
{
    [RoutePrefix("api/Test")]
    public class TestController : ApiController
    {
        private readonly ITestingService _services;

        public TestController()
        {
            _services = new TestingService();
        }

        [Route("GetTestData")]
        [HttpGet]
        public IHttpActionResult GetTestData()
        {
            return Ok(_services.GetTestingData().Data);
        }
    }
}
