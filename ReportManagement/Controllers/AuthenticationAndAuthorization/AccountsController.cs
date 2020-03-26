using Microsoft.AspNet.Identity;
using ReportManagement.Model.User;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace ReportManagement.Controllers
{

    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController
    {
        // TODO: have to redo these by service architecture

        // URL: api/accounts/users
        [Authorize(Roles = "Admin")]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
        }

        // URL: api/accounts/
        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id);

            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        // URL: api/accounts/user/{username}
        [Authorize(Roles = "Admin")]
        [Route("user/{userName}")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await this.AppUserManager.FindByNameAsync(username);
            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        // URL: api/accounts/create
        [AllowAnonymous]
        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(AccountCreateBindingModels accountCreateBindingModels)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userInfo = new UserInfo()
            {
                FirstName = accountCreateBindingModels.FirstName,
                LastName = accountCreateBindingModels.LastName,
                JobTitle = accountCreateBindingModels.JobTitle,
                Address = accountCreateBindingModels.Address,
                Sex = accountCreateBindingModels.Sex,
                IsEmployeeProfile = accountCreateBindingModels.IsEmployeeProfile,
                IsActiveEmployee = accountCreateBindingModels.IsActiveEmployee
            };

            var user = new ApplicationUser()
            {
                UserName = accountCreateBindingModels.UserName,
                Email = accountCreateBindingModels.Email,
                UserInfo = userInfo
            };

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, accountCreateBindingModels.Password);

            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }

            // assigning default user role to user
            var addedUser = this.AppUserManager.FindByName(user.UserName);
            IdentityResult assignRolesResult = await AppUserManager.AddToRoleAsync(addedUser.Id, "User").ConfigureAwait(true);

            if(!assignRolesResult.Succeeded)
            {
                return GetErrorResult(assignRolesResult);
            }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }

        // URL: api/accounts/ChangePassword
        [Authorize]
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(),
                model.OldPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        // URL: api/accounts/user/delete/{id}
        [Authorize(Roles = "Admin")]
        [Route("user/delete/{id:guid}")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            // only superadmin or admin can delete users

            var appUser = await this.AppUserManager.FindByIdAsync(id);

            if (appUser != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(appUser);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok();
            }

            return NotFound();
        }


        // URL: api/accounts/user/{id}/roles
        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}/roles")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser([FromUri] string Id, [FromBody] string[] rolesToAssign)
        {
            var appUser = await this.AppUserManager.FindByIdAsync(Id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id);

            var rolesNotExists = rolesToAssign.Except(this.AppRoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Count() > 0)
            {
                ModelState.AddModelError("", String.Format("Roles '{0}' does not exist in the sytem", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult =
                await this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray());

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, rolesToAssign);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok(addResult);
        }

    }
}
