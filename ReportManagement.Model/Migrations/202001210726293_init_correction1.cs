namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init_correction1 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.ReportDetail", new[] { "Report_id" });
            RenameColumn(table: "dbo.ReportDetail", name: "Report_id", newName: "ReportId");
            AlterColumn("dbo.ReportDetail", "ReportId", c => c.Int(nullable: false));
            CreateIndex("dbo.ReportDetail", "ReportId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ReportDetail", new[] { "ReportId" });
            AlterColumn("dbo.ReportDetail", "ReportId", c => c.Int());
            RenameColumn(table: "dbo.ReportDetail", name: "ReportId", newName: "Report_id");
            CreateIndex("dbo.ReportDetail", "Report_id");
        }
    }
}
