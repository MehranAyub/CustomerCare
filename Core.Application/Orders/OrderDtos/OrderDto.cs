using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Orders.OrderDtos
{
    public class OrderDto
    {
        public int CustomerId { get; set; }
        public int TotalBill { get; set; }
        public string? Address { get; set; }
        public string? Time { get; set; }
        public int? NoOfItems { get; set; }
        public string? Email { get; set; }

        public int? Status { get; set; }
        public string? Customer { get; set; }
        public string? Phone { get; set; }
        public ICollection<OrderDetails>? OrderDetail { get; set; }

    }
     
    public class OrderDetails
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public string productName { get; set; }
        public int price { get; set; }
        public string image { get; set; }
    }

}
