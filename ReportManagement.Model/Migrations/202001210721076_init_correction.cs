namespace ReportManagement.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init_correction : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Report", "ReportDetail_id", "dbo.ReportDetail");
            DropIndex("dbo.Report", new[] { "ReportDetail_id" });
            AddColumn("dbo.ReportDetail", "Report_id", c => c.Int());
            CreateIndex("dbo.ReportDetail", "Report_id");
            AddForeignKey("dbo.ReportDetail", "Report_id", "dbo.Report", "id");
            DropColumn("dbo.Report", "ReportDetail_id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Report", "ReportDetail_id", c => c.Int());
            DropForeignKey("dbo.ReportDetail", "Report_id", "dbo.Report");
            DropIndex("dbo.ReportDetail", new[] { "Report_id" });
            DropColumn("dbo.ReportDetail", "Report_id");
            CreateIndex("dbo.Report", "ReportDetail_id");
            AddForeignKey("dbo.Report", "ReportDetail_id", "dbo.ReportDetail", "id");
        }
    }
}
