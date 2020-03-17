using ReportManagement.Model.User;
using ReportManagement.Services.PhotoExtension;
using ReportManagement.Services.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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

        [Route("UpdateUserProfile")]
        [HttpPut]
        public IHttpActionResult UpdateUserProfile(EditUserProfileBindingModel user)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            return Ok(_service.UpdateUserProfile(user).Data);
        }

        //[Route("UploadPhoto/{id:guid}")]
        //[HttpPost]
        //public async IHttpActionResult UploadPhoto(HttpRequestMessage request, string Id)
        //{
        //    if(!request.Content.IsMimeMultipartContent())
        //    {
        //        return BadRequest();
        //    }

        //    var data = await Request.Content.ParseMultipartAsync();

        //    if(data.Files.ContainsKey("file"))
        //    {
        //        var photoName = data.Files["file"].Filename;
        //    }

        //    if(data.Files.ContainsKey("description"))
        //    {
        //        var photoDescription = data.Files["description"];
        //    }
        //    _service.UploadPicture(data, Id);
        //    return Ok();
        //}
    }
}
