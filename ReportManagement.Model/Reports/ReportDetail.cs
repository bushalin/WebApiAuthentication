using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ReportManagement.Model.Common;

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
