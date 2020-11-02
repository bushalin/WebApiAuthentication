using ReportManagement.Services;
using System.Web.Http;

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