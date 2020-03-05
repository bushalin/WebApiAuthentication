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

        public JsonResult GetUserDetailById(string Id)
        {
            var result = _context.UserInfo.Where(x => x.UserId == Id)
                .Select(x => new
                {
                    x.FirstName,
                    x.LastName,
                    x.JobTitle,
                    x.Address,
                    x.Sex
                }).FirstOrDefault();

            return new JsonResult
            {
                Data = result,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult UpdateUserProfile(EditUserProfileBindingModel user)
        {
            var message = "";

            if(user == null)
            {
                message = "Please provide valid user data";
                return new JsonResult
                {
                    Data = message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }

            var userInfo = _context.Users.Find(user.UserId);
            var userDetail = _context.UserInfo.Find(user.UserId);

            if(userInfo != null)
            {
                userInfo.PhoneNumber = user.Phone;

                try
                {
                    _services.SaveChanges();
                    message = "Phone no updated successfully";
                }
                catch(Exception ex)
                {
                    message = ex.Message;
                }
            }
            if(userDetail != null)
            {
                userDetail.FirstName = user.FirstName;
                userDetail.LastName = user.LastName;
                userDetail.JobTitle = user.JobTitle;
                userDetail.Sex = user.Sex;
                userDetail.Address = user.Address;

                try
                {
                    _services.SaveChanges();
                    message = "User information updated successfully";
                }
                catch(Exception ex)
                {
                    message = ex.Message;
                }
            }

            return new JsonResult
            {
                Data = message,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }

    public interface IUserServices
    {
        JsonResult GetAllUserInfo();
        JsonResult GetUserDetailById(string Id);
        JsonResult UpdateUserProfile(EditUserProfileBindingModel user);
    }
}
