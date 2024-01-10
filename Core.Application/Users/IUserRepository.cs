using Core.Application.Customers.CustomerDtos;
using Core.Data.Entities;
namespace Core.Application.Users
{
    public interface IUserRepository
    {

        IEnumerable<User> GetAllUsers();
        User ValidateUser(UserDto userDto);
        void CreateCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(Customer customer);
    }
}
