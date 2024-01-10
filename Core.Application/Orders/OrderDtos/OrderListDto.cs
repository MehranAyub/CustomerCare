using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Orders.OrderDtos
{
    public class OrderListDto
    {
        public int Id { get; set; }
        public int Status { get; set; }
        public int TotalBill { get; set; }
        public string? Address { get; set; }
        public string? Date { get; set; }
        public string? Customer { get; set; }
        
    }
}
