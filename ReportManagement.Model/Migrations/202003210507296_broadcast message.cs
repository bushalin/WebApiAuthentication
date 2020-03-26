namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class broadcastmessage : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BroadcastMessage",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Message = c.String(),
                        UserId = c.String(maxLength: 128),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.Int(),
                        UpdatedDate = c.DateTime(),
                        UpdatedBy = c.Int(),
                    })
                .PrimaryKey(t => t.id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            AddColumn("dbo.UserInfo", "Address_PostCode", c => c.String());
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BroadcastMessage", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.BroadcastMessage", new[] { "UserId" });
            DropColumn("dbo.UserInfo", "Address_PostCode");
            DropTable("dbo.BroadcastMessage");
        }
    }
}
