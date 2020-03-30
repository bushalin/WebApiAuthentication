namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class broadcastMessage_title_add : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Broadcast_Message", "MessageTitle", c => c.String());
            AddColumn("dbo.Broadcast_Message", "MessageBody", c => c.String());
            DropColumn("dbo.Broadcast_Message", "Message");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Broadcast_Message", "Message", c => c.String());
            DropColumn("dbo.Broadcast_Message", "MessageBody");
            DropColumn("dbo.Broadcast_Message", "MessageTitle");
        }
    }
}
