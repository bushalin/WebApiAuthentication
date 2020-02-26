using Newtonsoft.Json.Linq;
using ReportManagement.Model;
using ReportManagement.Model.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace ReportManagement.Services.Reports
{
    public class ReportServices : IReportServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IEntityService<Report> _services;
        private readonly IEntityService<ReportDetail> _detailServices;

        public ReportServices()
        {
            _context = new ApplicationDbContext();
            _services = new EntityService<Report>(_context);
            _detailServices = new EntityService<ReportDetail>(_context);
        }

        public JsonResult GetAllReports()
        {
            var result = _context.Report.Select(x => x.id);
            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetRecentReports()
        {
            var result = _context.UserInfo.Select(x => new
            {
                x.UserId,
                x.FirstName,
                x.LastName
            })
                .Join(_context.Report,
                    u => u.UserId,
                    v => v.UserId,
                    (u, v) => new { User = u, Report = v })
                .Select(x => new
                {
                    x.User.FirstName,
                    x.User.LastName,
                    x.User.UserId,
                    reportId = x.Report.id,
                    x.Report.Remarks,
                    x.Report.ReportStatus,
                    x.Report.CreatedDate,

                    ReportDetail = _context.ReportDetail.Where(r => r.ReportId == x.Report.id)
                        .Select(rd => new
                        {
                            rd.Plan,
                            rd.Details,
                            rd.Progress
                        }).ToList()
                }).OrderByDescending(x => x.CreatedDate);

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetReportByUserId(string id)
        {
            var result = _context.UserInfo.Where(x => x.UserId == id)
                .Join(_context.Report,
                    u => u.UserId,
                    v => v.UserId,
                    (u, v) => new { User = u, Report = v })
                .Select(t => new
                {
                    t.User.FirstName,
                    t.User.LastName,
                    t.User.JobTitle,
                    t.User.Address,
                    t.User.Sex,
                    t.Report.CreatedDate,
                    t.Report.id,
                    t.Report.ReportStatus,
                    t.Report.Remarks,

                    ReportDetail = _context.ReportDetail.Where(r => r.ReportId == t.Report.id)
                        .Select(rd => new
                        {
                            rd.Plan,
                            rd.Details,
                            rd.Progress
                        }).ToList()
                }).OrderByDescending(x => x.CreatedDate);

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult GetReportByUserName(string username)
        {
            var userId = _context.UserInfo.Where(x => x.FirstName == username || x.LastName == username).Select(x=> x.UserId).FirstOrDefault();
            if (userId == null)
            {
                var message = "User not found";

                return new JsonResult
                {
                    Data = message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

            var result = _context.UserInfo.Where(x => x.UserId == userId)
                .Join(_context.Report,
                    u => u.UserId,
                    v => v.UserId,
                    (u, v) => new { User = u, Report = v })
                .Select(t => new
                {
                    t.User.FirstName,
                    t.User.LastName,
                    t.User.JobTitle,
                    t.User.Address,
                    t.User.Sex,
                    t.Report.CreatedDate,
                    t.Report.id,
                    t.Report.ReportStatus,
                    t.Report.Remarks,

                    ReportDetail = _context.ReportDetail.Where(r => r.ReportId == t.Report.id)
                        .Select(rd => new
                        {
                            rd.Plan,
                            rd.Details,
                            rd.Progress
                        }).ToList()
                });

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult SaveReport(JObject obj)
        {
            var message = "";
            var report = obj["report"].ToObject<Report>();
            report.ReportDetails = obj["reportDetail"].ToObject<List<ReportDetail>>();

            //report.CreatedDate = DateTime.Today;

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
                    var reportId = report.id;

                    foreach (var item in report.ReportDetails)
                    {
                        item.ReportId = reportId;
                        _detailServices.Save(item);
                        _detailServices.SaveChanges();
                    }

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
        JsonResult GetReportByUserId(string Id);
        JsonResult GetReportByUserName(string username);
        JsonResult GetAllReports();
        JsonResult GetRecentReports();
        JsonResult SaveReport(JObject obj);
    }
}
