using Core.Application.Customers;
using Core.Application.Orders;
using Core.Application.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public interface IRepositoryWrapper
    {
        ICustomerRepository Customer { get; }
        IProductRepository Product { get; }
        IOrderRepository Order { get; }

        void Save();
    }
}
