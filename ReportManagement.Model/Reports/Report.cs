using ReportManagement.Model.Common;
using ReportManagement.Model.User;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReportManagement.Model.Reports
{
    public class Report : AuditableEntity<int>
    {
        public string Remarks { get; set; }

        public bool ReportStatus { get; set; }
        //public virtual ReportDetail ReportDetail { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }

        public IEnumerable<ReportDetail> ReportDetails { get; set; }

    }
}
