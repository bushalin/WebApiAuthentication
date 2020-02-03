using ReportManagement.Model.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReportManagement.Model.Reports
{
    public class ReportDetail : AuditableEntity<int>
    {
        public string Plan { get; set; }
        public string Details { get; set; }
        public string Progress { get; set; }

        //one to one relationship
        //[Key, ForeignKey("Report")]
        //public int ReportId { get; set; }
        //public virtual Report Report { get; set; }

        [ForeignKey("Report")]
        public int ReportId { get; set; }
        public virtual Report Report { get; set; }
    }
}
