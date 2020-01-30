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

        public JsonResult SaveReport(ReportViewModel obj)
        {
            var message = "";

            var reportDetails = new List<ReportDetail>();
            var report = new Report
            {
                UserId = obj.UserId,
                ReportStatus = obj.ReportStatus,
                CreatedDate = DateTime.Now
            };

            if (report.ReportStatus == false)
            {
                message = "Report Status not available";
            }
            else
            {
                try
                {
                    _services.Save(report);
                    _services.SaveChanges();
                    message = "Report Saved Successfully";
                }
                catch (Exception ex)
                {
                    message = ex.Message;
                }
            }

            return new JsonResult
            {
                Data = new
                {
                    message 
                },

                JsonRequestBehavior =  JsonRequestBehavior.AllowGet
            };
        }


    }

    public interface IReportServices
    {
        JsonResult GetReportByName(string username);
        JsonResult SaveReport(ReportViewModel obj);
    }
}
