using Core.Application.Orders.OrderDtos;
using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Orders
{
    public interface IOrderRepository
    {
        IEnumerable<OrderListDto> GetAllOrders();
        List<Order> GetOrderById(int orderId);
        OrderDto GetOrderWithDetails(int orderId);
        void CreateOrder(OrderDto order);
        void OrderActions(OrderListDto order);
    }
}
