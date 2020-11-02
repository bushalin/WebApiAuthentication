using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.DataProtection;
using ReportManagement.Model.User;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace ReportManagement.Controllers
{
    [RoutePrefix("v1/accounts")]
    public class AccountsController : BaseApiController
    {
        // TODO: have to redo these by service architecture

        // URL: v1/accounts/users
        [Authorize(Roles = "Admin")]
        [Route("users")]
        public IHttpActionResult GetUsers()
        {
            return Ok(this.AppUserManager.Users.ToList().Select(u => this.TheModelFactory.Create(u)));
        }

        // URL: v1/accounts/
        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}", Name = "GetUserById")]
        public async Task<IHttpActionResult> GetUser(string Id)
        {
            var user = await this.AppUserManager.FindByIdAsync(Id).ConfigureAwait(true);

            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        // URL: v1/accounts/user/{username}
        [Authorize(Roles = "Admin")]
        [Route("user/{userName}")]
        public async Task<IHttpActionResult> GetUserByName(string username)
        {
            var user = await this.AppUserManager.FindByNameAsync(username).ConfigureAwait(true);
            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }

            return NotFound();
        }

        // URL: v1/accounts/create
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

            IdentityResult addUserResult = await this.AppUserManager.CreateAsync(user, accountCreateBindingModels.Password).ConfigureAwait(true);

            if (!addUserResult.Succeeded)
            {
                return GetErrorResult(addUserResult);
            }

            // assigning default user role to user
            var addedUser = this.AppUserManager.FindByName(user.UserName);
            IdentityResult assignRolesResult = await AppUserManager.AddToRoleAsync(addedUser.Id, "User").ConfigureAwait(true);

            if (!assignRolesResult.Succeeded)
            {
                return GetErrorResult(assignRolesResult);
            }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));

            return Created(locationHeader, TheModelFactory.Create(user));
        }

        // URL: v1/accounts/ChangePassword
        [Authorize]
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword).ConfigureAwait(true);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = User.Identity.GetUserId() }));

            return Ok(locationHeader);
        }

        // URL : v1/accounts/ResetPassword
        [Authorize(Roles = "Admin")]
        [Route("ResetPassword")]
        [HttpPost]
        public async Task<IHttpActionResult> ResetPassword(PasswordResetBindingModel model)
        {
            var provider = new DpapiDataProtectionProvider("ReportManagement");

            this.AppUserManager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser, string>(provider.Create("UserToken")) as IUserTokenProvider<ApplicationUser, string>;

            string resetToken = await this.AppUserManager.GeneratePasswordResetTokenAsync(model.UserId).ConfigureAwait(true);
            if (resetToken != null)
            {
                IdentityResult result = await this.AppUserManager.ResetPasswordAsync(model.UserId, resetToken, model.NewPassword).ConfigureAwait(true);
                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }
            }
            return Ok("Password reset successfully");
        }

        // URL: v1/accounts/user/delete/{id}
        [Authorize(Roles = "Admin")]
        [Route("user/delete/{id:guid}")]
        public async Task<IHttpActionResult> DeleteUser(string id)
        {
            // only superadmin or admin can delete users

            var appUser = await this.AppUserManager.FindByIdAsync(id).ConfigureAwait(true);

            if (appUser != null)
            {
                IdentityResult result = await this.AppUserManager.DeleteAsync(appUser).ConfigureAwait(true);

                if (!result.Succeeded)
                {
                    return GetErrorResult(result);
                }

                return Ok();
            }

            return NotFound();
        }

        // URL: v1/accounts/user/{id}/roles
        [Authorize(Roles = "Admin")]
        [Route("user/{id:guid}/roles")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser([FromUri] string Id, [FromBody] string[] rolesToAssign)
        {
            var appUser = await this.AppUserManager.FindByIdAsync(Id).ConfigureAwait(true);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id).ConfigureAwait(true);

            var rolesNotExists = rolesToAssign.Except(this.AppRoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Any())
            {
                ModelState.AddModelError("", String.Format("Roles '{0}' does not exist in the sytem", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult =
                await this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray()).ConfigureAwait(true);

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, rolesToAssign).ConfigureAwait(true);

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok(addResult);
        }

        [Authorize(Roles = "Admin")]
        [Route("user/AssignRolesToUser")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser(AssignRolesToUserBindingModel model)
        {
            var appUser = await this.AppUserManager.FindByIdAsync(model.UserId).ConfigureAwait(true);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.AppUserManager.GetRolesAsync(appUser.Id).ConfigureAwait(true); ;

            var rolesNotExists = model.RolesToAssign.Except(this.AppRoleManager.Roles.Select(x => x.Name)).ToArray();

            if (rolesNotExists.Any())
            {
                ModelState.AddModelError("", String.Format("Roles '{0}' does not exist in the sytem", string.Join(",", rolesNotExists)));
                return BadRequest(ModelState);
            }

            IdentityResult removeResult =
                await this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray()).ConfigureAwait(true); ;

            if (!removeResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to remove user roles");
                return BadRequest(ModelState);
            }

            IdentityResult addResult = await this.AppUserManager.AddToRolesAsync(appUser.Id, model.RolesToAssign).ConfigureAwait(true); ;

            if (!addResult.Succeeded)
            {
                ModelState.AddModelError("", "Failed to add user roles");
                return BadRequest(ModelState);
            }

            return Ok(addResult);
        }
    }
}