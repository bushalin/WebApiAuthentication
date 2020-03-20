namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class userInfoUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserInfo", "IsEmployeeProfile", c => c.Boolean(nullable: false));
            AddColumn("dbo.UserInfo", "IsActiveEmployee", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserInfo", "IsActiveEmployee");
            DropColumn("dbo.UserInfo", "IsEmployeeProfile");
        }
    }
}
