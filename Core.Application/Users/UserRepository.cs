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

namespace Core.Application.Users
{
    internal class UserRepository : IUserRepository,IRepositoryBase<User>
    {
        RepositoryContext _repositoryContext;
        public UserRepository(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }
        public IEnumerable<User> GetAllUsers()
        {
            return _repositoryContext.Users.Where(n=>n.Role!=Role.Admin).OrderBy(s => s.Id).ToList();
        }

        public User ValidateUser(UserDto user)
        {
            var entity = _repositoryContext.Users.FirstOrDefault(c => c.Email ==user.Email && c.Password==user.Password);
            if (entity != null)
            {
                return entity;
            }
            return null;
        }
        //public Customer GetCustomerWithDetails(int customerId)
        //{
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


        //    return null;
        //}

        public void CreateCustomer(User user)
        {
            _repositoryContext.Users.Add(user);

        }

        public void UpdateCustomer(User user)
        {

            _repositoryContext.Users.Update(user);

        }

        public void DeleteUser(User user)
        {
            //var address = _repositoryContext.Addresses.FirstOrDefault(address => address.Id.Equals(student.AddressId));
            //_repositoryContext.Students.Remove(student);
            //_repositoryContext.Addresses.Remove(address);
            _repositoryContext.Users.Remove(user);
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
