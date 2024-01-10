using Core.Application.Customers.CustomerDtos;
using Core.Data.Entities;
namespace Core.Application.Customers
{
    public interface ICustomerRepository
    {

        IEnumerable<Customer> GetAllCustomers();
        Customer GetCustomerById(int customerId);
        Customer ValidateCustomer(CustomerDto customer);
        Customer GetCustomerWithDetails(int customerId);
        void CreateCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(Customer customer);
    }
}
