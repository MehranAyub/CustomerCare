using Core.Application.Customers;
using Core.Application.Orders;
using Core.Application.Products;
using Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private RepositoryContext _repositoryContext;
        private ICustomerRepository _studentRepository;
        private IProductRepository _teacherRepository;
        private IOrderRepository _addressRepository;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public ICustomerRepository Customer
        {
            get
            {
                if (_studentRepository == null)
                {
                    _studentRepository = new CustomerRepository(_repositoryContext);
                }
                return _studentRepository;
            }
        }
        public IProductRepository Product
        {
            get
            {
                if (_teacherRepository == null)
                {
                    _teacherRepository = new ProductRepository(_repositoryContext);
                }
                return _teacherRepository;
            }
        }
        public IOrderRepository Order
        {
            get
            {
                if (_addressRepository == null)
                {
                    _addressRepository = new OrderRepository(_repositoryContext);
                }
                return _addressRepository;
            }
        }


        public void Save()
        {
            _repositoryContext.SaveChanges();
        }


    }
}
