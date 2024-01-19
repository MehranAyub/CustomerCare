using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class Complaint
    {
        public Guid Id { get; set; }
        public string Type { get; set; }=string.Empty;
        public string Subject { get; set; }= string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? AgentRemarks { get; set; } = string.Empty;
        public Guid? CustomerId { get; set; }
        public Guid? AgentId { get; set; }
        public ComplaintStatus Status { get; set; }
        public List<Image> Images { get; set; }=new List<Image>();
    }
    public enum ComplaintStatus
    {
        Pending,
        InProgress,
        Resolved,
        Cancelled
    }

}
