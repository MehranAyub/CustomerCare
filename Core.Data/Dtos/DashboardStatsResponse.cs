using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Dtos
{
    public class DashboardStatsResponse
    {
        public int Agents { get; set; }
        public int Complaints { get; set; }
        public int Customers { get; set;}
        public int Pending { get; set; }
        public int InProgress { get; set; }
        public int Resolved { get; set; }
        public int Cancelled { get; set; }
    }
}
