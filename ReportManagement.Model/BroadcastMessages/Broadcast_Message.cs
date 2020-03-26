using ReportManagement.Model.Common;
using ReportManagement.Model.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportManagement.Model.BroadcastMessages
{
    public class Broadcast_Message : AuditableEntity<int>
    {
        public string Message { get; set; }


        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual ApplicationUser AppliactionUser { get; set; }
    }
}
