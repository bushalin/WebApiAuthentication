using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReportManagement.Model.Common
{
    public class Entity<T>
    {
        [Key]
        public T id { get; set; }
    }
}
