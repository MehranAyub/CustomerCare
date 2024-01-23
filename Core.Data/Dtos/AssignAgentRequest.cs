using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Dtos
{
    public class AssignAgentRequest
    {
        public Guid AgentId { get; set; }
        public Guid ComplaintId { get; set; }
    }
}
