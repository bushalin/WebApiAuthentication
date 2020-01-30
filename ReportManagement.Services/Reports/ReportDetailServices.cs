using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using ReportManagement.Model;
using ReportManagement.Model.Reports;

namespace ReportManagement.Services.Reports
{
    public class ReportDetailServices: IReportDetailServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IEntityService<ReportDetail> _service;

        public ReportDetailServices()
        {
            _context = new ApplicationDbContext();
            _service = new EntityService<ReportDetail>(_context);
        }


        public JsonResult SaveReportDetail(ReportViewModel obj)
        {
            var message = "";
            ReportDetail reportDetail = new ReportDetail
            {
                Plan = obj.Plan,
                Progress = obj.Progress,
                Details = obj.Details
            };

            if (obj.Plan == null || obj.Details == null)
            {
                message = "please enter a plan or details";
            }
            else
            {
                try
                {
                    _service.Save(reportDetail);
                    _service.SaveChanges();
                    message = "Report Detail saved successfully";
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
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }

    public interface IReportDetailServices
    {
        JsonResult SaveReportDetail(ReportViewModel obj);
    }
}
