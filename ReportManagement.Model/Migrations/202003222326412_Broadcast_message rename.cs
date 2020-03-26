namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Broadcast_messagerename : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.BroadcastMessage", newName: "Broadcast_Message");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.Broadcast_Message", newName: "BroadcastMessage");
        }
    }
}
