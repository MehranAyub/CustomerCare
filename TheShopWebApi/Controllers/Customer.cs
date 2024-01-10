using Core.Application;
using Core.Application.Customers.CustomerDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using StackExchange.Redis;
using Newtonsoft.Json.Linq;
using System.Text.Json;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace TheShopWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Customer : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public Customer(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
        }
        [HttpGet]
        public async Task< IActionResult> GetAllCustomers()
        {
            try
            {
                    var customers = _repository.Customer.GetAllCustomers();
                    if (customers != null)
                    {
                        return Ok(customers);
                    }
                    else
                    {
                        return Ok(null);
                    }
 
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }

        [HttpGet("{id}", Name = "CustomerById")]
        public IActionResult GetCustomerById(int id)
        {
            try
            {
                var customer = _repository.Customer.GetCustomerById(id);
                if (customer == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(customer);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpGet("{id}/address")]
        public IActionResult GetCustomerWithDetails(int id)
        {
            try
            {
                var customer = _repository.Customer.GetCustomerWithDetails(id);
                if (customer == null)
                {
                    return NotFound();
                }

                return new JsonResult(customer);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpPost]
        public IActionResult CreateCustomer([FromBody] Core.Data.Entities.Customer customer)
        {
            
            try
            {
                if (customer == null)
                {
                    return BadRequest("Customer object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



                _repository.Customer.CreateCustomer(customer);
                _repository.Save();


                return CreatedAtRoute("CustomerById", new { id = customer.Id }, customer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"+ex);
            }
        }
        [HttpPost("ValidateCustomer")]
        public IActionResult ValidateCustomer([FromBody] CustomerDto customer)
        {

            try
            {
                if (customer == null)
                {
                    return BadRequest("Customer object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



               var response= _repository.Customer.ValidateCustomer(customer);
                return Ok(response);    

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }
        [HttpPut]
        public IActionResult UpdateCustomer([FromBody] Core.Data.Entities.Customer customer)
        {
            try
            {
                if (customer == null)
                {
                    return BadRequest("customer object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



                _repository.Customer.UpdateCustomer(customer);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            try
            {
                var customer = _repository.Customer.GetCustomerById(id);

                if (customer == null)
                {
                    return NotFound();
                }

                _repository.Customer.DeleteCustomer(customer);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }
    }
}
