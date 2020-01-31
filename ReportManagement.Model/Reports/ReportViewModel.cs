using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportManagement.Model.Reports
{
    public class ReportViewModel
    {
        public string UserId { get; set; }
        public string Remarks { get; set; }
        public bool ReportStatus { get; set; }
        
        public IEnumerable<ReportDetail> ReportDetail { get; set; }
    }
}
