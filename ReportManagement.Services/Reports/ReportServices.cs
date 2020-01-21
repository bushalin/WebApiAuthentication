using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using System.Web.Mvc;
using ReportManagement.Model;
using ReportManagement.Model.Reports;

namespace ReportManagement.Services.Reports
{
    public class ReportServices : IReportServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IEntityService<Report> _services;

        public ReportServices()
        {
            _context = new ApplicationDbContext();
            _services = new EntityService<Report>(_context);
        }

        public JsonResult GetReportByName(string username)
        {
            var userid = _context.UserInfo.FirstOrDefault(x => x.FirstName == username);

            var result = _context.Report.Where(x => x.UserId == userid.UserId)
                .Join(_context.ReportDetail,
                    x => x.id,
                    y => y.ReportId,
                    (x, y) => new {Report = x, ReportDetail = y})
                .Select(x => new
                {
                    x.Report.id,
                    x.Report.Remarks,
                    x.Report.CreatedDate,
                    x.Report.UserId,
                    x.Report.ReportStatus,
                    x.ReportDetail.Plan,
                    x.ReportDetail.Details,
                    x.ReportDetail.Progress
                }).ToList();
            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        //public JsonResult GetReportByName(string username)
        //{
        //    throw new NotImplementedException();
        //}
    }

    public interface IReportServices
    {
        JsonResult GetReportByName(string username);
    }
}
