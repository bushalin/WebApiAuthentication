using ReportManagement.Model;
using ReportManagement.Model.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ReportManagement.Services.Users
{
    public class UserServices : IUserServices
    {
        private readonly ApplicationDbContext _context;
        private readonly IEntityService<UserInfo> _services;

        public UserServices()
        {
            _context = new ApplicationDbContext();
            _services = new EntityService<UserInfo>(_context);
        }

        public JsonResult GetAllUserInfo()
        {
            var result = _context.UserInfo.Select(x => new
            {
                x.UserId,
                x.FirstName,
                x.LastName,
                x.JobTitle,
                x.Sex,
                x.Address
            }).ToList();

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }

    public interface IUserServices
    {
        JsonResult GetAllUserInfo();
    }
}
