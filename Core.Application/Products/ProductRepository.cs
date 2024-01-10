using Core.Data;
using Core.Data.Entities;
using Core.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheShopWebApi.Dtos;

namespace Core.Application.Products
{
    internal class ProductRepository:IProductRepository

    {
        RepositoryContext _repositoryContext;
        public ProductRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<Product> GetAllProducts()
        {

            return _repositoryContext.Products.OrderBy(s => s.ProductName).ToList();
        }

        public Product GetProductById(int productId)
        {
            var product = _repositoryContext.Products.FirstOrDefault(s => s.Id == productId);
            return product;
        }

        public Product GetProductWithDetails(int productId)
        {
            //Product query = null;
            //var studentEntity = _repositoryContext.Students.Where(student => student.Id.Equals(studentId)).FirstOrDefault();
            //if (studentEntity != null)
            //{
            //    var address = _repositoryContext.Addresses.Where(address => address.Id.Equals(studentEntity.AddressId)).FirstOrDefault();
            //    query = new Student
            //    {
            //        Id = studentEntity.Id,
            //        Address = address,
            //        RollId = studentEntity.RollId,
            //        Name = studentEntity.Name,
            //        Age = studentEntity.Age,
            //        Class = studentEntity.Class,
            //        AdmissionDate = studentEntity.AdmissionDate,
            //    };
            //}


            //return query;
            return null;
        }

        public void CreateProduct(Product product)
        {
            _repositoryContext.Products.Add(product);

        }

        public void UpdateProduct(Product product)
        {

            _repositoryContext.Products.Update(product);

        }

        public void DeleteProduct(Product product)
        {
            //var address = _repositoryContext.Addresses.FirstOrDefault(address => address.Id.Equals(student.AddressId));
            //_repositoryContext.Students.Remove(student);
            //_repositoryContext.Addresses.Remove(address);

        }
        public DashboardDto Counts()
        {
            DashboardDto dto = new DashboardDto();

            dto.Orders = _repositoryContext.Orders.Count();
            dto.Customers = _repositoryContext.Customers.Count();
            dto.PendingOrders = _repositoryContext.Orders.Where(o => o.Status == 0).Count();
            dto.ApprovedOrders = _repositoryContext.Orders.Where(o=>o.Status==1).Count();
            dto.DeliveredOrders = _repositoryContext.Orders.Where(o => o.Status == 2).Count();
            dto.CancelledOrders = _repositoryContext.Orders.Where(o => o.Status == -1).Count();
            dto.Products= _repositoryContext.Products.Count();
            return dto;
        }
    }
}
