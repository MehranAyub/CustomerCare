using Core.Application.Customers.CustomerDtos;
using Core.Data;
using Core.Data.Entities;
using Core.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Application.Customers
{
    internal class CustomerRepository : ICustomerRepository,IRepositoryBase<Customer>
    {
        RepositoryContext _repositoryContext;
        public CustomerRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<Customer> GetAllCustomers()
        {

            return _repositoryContext.Customers.OrderBy(s => s.FName).ToList();
        }

        public Customer GetCustomerById(int customerId)
        {
            var customer = _repositoryContext.Customers.FirstOrDefault(s => s.Id == customerId);
            return customer;
        }
        
        public Customer ValidateCustomer(CustomerDto customer)
        {
            var user = _repositoryContext.Customers.FirstOrDefault(c => c.Email == customer.Email && c.Passwrord==customer.Password);
            if (user != null)
            {
                return user;
            }
            return null;
        }
        public Customer GetCustomerWithDetails(int customerId)
        {
            //Customer query = null;
            //var studentEntity = _repositoryContext.Customers.Where(student => student.Id.Equals(customerId)).FirstOrDefault();
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


            return null;
        }

        public void CreateCustomer(Customer customer)
        {
            _repositoryContext.Customers.Add(customer);

        }

        public void UpdateCustomer(Customer customer)
        {

            _repositoryContext.Customers.Update(customer);

        }

        public void DeleteCustomer(Customer customer)
        {
            //var address = _repositoryContext.Addresses.FirstOrDefault(address => address.Id.Equals(student.AddressId));
            //_repositoryContext.Students.Remove(student);
            //_repositoryContext.Addresses.Remove(address);

        }

        public IQueryable<Customer> GetAll()
        {
            throw new NotImplementedException();
        }

        public IQueryable<Customer> FindByCondition(Expression<Func<Customer, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public void Create(Customer entity)
        {
            throw new NotImplementedException();
        }

        public void Update(Customer entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(Customer entity)
        {
            throw new NotImplementedException();
        }
    }
}
