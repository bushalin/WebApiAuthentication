using ReportManagement.Model.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ReportManagement.Services
{
    public class TestingService : ITestingService
    {
        public JsonResult GetTestingData()
        {
            var result = new TestingModel
            {
                Id = 1,
                Description = "Some Description",
                Name = "NameTest"
            };

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }

    public interface ITestingService
    {
        JsonResult GetTestingData();
    }
}
