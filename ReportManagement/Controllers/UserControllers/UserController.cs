using ReportManagement.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReportManagement.Controllers.UserControllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private readonly IUserServices _service;

        public UserController()
        {
            _service = new UserServices();
        }

        [Route("GetAllUserInfo")]
        [HttpGet]
        public IHttpActionResult GetAllUserInfo()
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            return Ok(_service.GetAllUserInfo().Data);
        }

        [Route("GetUserDetailById/{id:Guid}")]
        [HttpGet]
        public IHttpActionResult GetUserDetailById(string id)
        {
            return Ok(_service.GetUserDetailById(id).Data);
        }
    }
}
