using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ReportManagement.Model.User
{
    public class ApplicationUser : IdentityUser
    {
        public virtual UserInfo UserInfo { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType, ApplicationUser user)
        {
            //JwtSecurityTokenHandler.DefaultInboundClaimTypeMap = new Dictionary<string, string>();
            //AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.NameIdentifier;
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here

            //var id = (ClaimsIdentity)(ClaimsPrincipal.Current.Identity);
            //userIdentity.RemoveClaim(userIdentity.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"));
            //var roles = (ClaimsIdentity)(ClaimsPrincipal.Current.Claims);
            //userIdentity.AddClaim(new Claim("unique_id", user.Id));

            //var roles = (Claim)manager.GetRoles(user.Id);


            #region CustomRoleAdd
            //List<Claim> claims = new List<Claim>();
            //claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));


            //var userClaims = await manager.GetClaimsAsync(user.Id);
            //var userRoles = await manager.GetRolesAsync(user.Id);
            //claims.AddRange(userClaims);
            //foreach (var userRole in userRoles)
            //{
            //    claims.Add(new Claim("role", userRole));
            //    //var role = await _roleManager.FindByNameAsync(userRole);
            //    //if (role != null)
            //    //{
            //    //    var roleClaims = await _roleManager.GetClaimsAsync(role);
            //    //    foreach (Claim roleClaim in roleClaims)
            //    //    {
            //    //        claims.Add(roleClaim);
            //    //    }
            //    //}
            //}
            //userIdentity.AddClaims(claims);
            #endregion



            return userIdentity;
        }
    }
}
