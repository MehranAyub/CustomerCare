using Core.Application.Orders.OrderDtos;
using Core.Data;
using Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Orders
{
    internal class OrderRepository : IOrderRepository
    {
        RepositoryContext _repositoryContext;
        public OrderRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<OrderListDto> GetAllOrders()
        {

            var orders = _repositoryContext.Orders.ToList();
            var customers = _repositoryContext.Customers.ToList();

            var records = (from o in orders
                           join c in customers
                           on o.CustomerId equals c.Id
                           select new OrderListDto
                           {
                               Id = o.Id,
                               Date = o.OrderDate.ToShortDateString(),
                               TotalBill = o.TotalBill,
                               Address = o.ShipAddress,
                               Status = o.Status,
                               Customer = c.FName + " " + c.LName

                           }).OrderBy(s => s.Date).ToList();
            return records;
        }

        public List<Order> GetOrderById(int orderId)
        {
            var order = _repositoryContext.Orders.Where(s => s.CustomerId == orderId).ToList();
            return order;
        }

        public OrderDto GetOrderWithDetails(int Id)
        {
            var order = _repositoryContext.Orders.FirstOrDefault(s => s.Id == Id);
            var orderDetail = _repositoryContext.OrderDetails.Where(s => s.OrderId == Id).ToList();
            var customer= _repositoryContext.Customers.FirstOrDefault(c => c.Id == order.CustomerId);

            var products = _repositoryContext.Products.ToList();
            var records=new OrderDto();
            if (orderDetail != null)
            {
                 records = new OrderDto
                {   
                    
                     Status=order.Status,
                    TotalBill = order.TotalBill,
                    Time = TimeCounter(order.OrderDate),
                    NoOfItems = orderDetail.Count(),
                    Customer=customer.FName+" "+customer.LName,
                    OrderDetail =(from o in orderDetail
                                   join p in products on
                                   o.ProductId equals p.Id
                                   select new OrderDetails{
                                         productName=p.ProductName,
                                         price=p.UnitPrice,
                                         image=p.Image,
                                         Quantity=1
                                   }).ToList()
                };
            }
 
                return records;
        }

        public void CreateOrder(OrderDto order)
        {
            var orders = new Order()
            {
                CustomerId = order.CustomerId,
                ShipAddress = order.Address,
                TotalBill = order.TotalBill,
                OrderDate = DateTime.Now,
                Details = order.OrderDetail.Select(n => new OrderDetail { ProductId = n.Id, Quantity = n.Quantity }).ToList(),
            };



            _repositoryContext.Orders.Add(orders);

        }


        public void OrderActions(OrderListDto action)
        {
            var order=_repositoryContext.Orders.FirstOrDefault(o=>o.Id==action.Id);
            order.Status=action.Status;
            _repositoryContext.Update(order);
            //var address = _repositoryContext.Addresses.FirstOrDefault(address => address.Id.Equals(student.AddressId));
            //_repositoryContext.Students.Remove(student);
            //_repositoryContext.Addresses.Remove(address);

        }

        public string TimeCounter(DateTime date)
        {
            TimeSpan orderTime = DateTime.Now-date;
            string Days = string.Format("{0:%d}", orderTime);
            string Hours = string.Format("{0:%h}", orderTime);
            string time = Days+"D ,"+Hours+"H";
            return time;
        }
        
    }
}
