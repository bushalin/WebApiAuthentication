using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ReportManagement.Model.User;

namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ReportManagement.Model.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ReportManagement.Model.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));

            var userInfo = new UserInfo()
            {
                FirstName = "Hasibul",
                LastName = "Hasan",
                Address = "Bangladesh",
                JobTitle = "Software Engineer",
                Sex = "Male",
            };

            var user = new ApplicationUser()
            {
                UserName = "admin",
                Email = "admin@admin.com",
                EmailConfirmed = true,
                PhoneNumber = "01741339123",
                PhoneNumberConfirmed = true,
                UserInfo = userInfo
            };

            manager.Create(user, "adminPassword");

            if (roleManager.Roles.Count() == 0)
            {
                roleManager.Create(new IdentityRole { Name = "Admin" });
                roleManager.Create(new IdentityRole { Name = "Management" });
                roleManager.Create(new IdentityRole { Name = "User" });
            }

            var adminUser = manager.FindByName("admin");

            manager.AddToRoles(adminUser.Id, new string[] { "Admin", "Management" });
        }
    }
}
