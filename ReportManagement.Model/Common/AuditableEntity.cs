using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportManagement.Model.Common
{
    public class AuditableEntity<T> : Entity<T>
    {
        public DateTime? CreatedDate { get; set; }

        public int? CreatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public int? UpdatedBy { get; set; }
    }
}
