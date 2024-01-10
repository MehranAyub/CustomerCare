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
        private readonly IDatabase _database;

        // private readonly IDistributedCache _distributedCache;
        //private string KeyName = "Master";

        public Customer(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;
            var connection = ConnectionMultiplexer.Connect("localhost:6379");
            _database = connection.GetDatabase();

        }
        //public Customer(IRepositoryWrapper repositoryWrapper, IDistributedCache distributedCache)
        //{
        //    _repository = repositoryWrapper;
        //    _distributedCache = distributedCache;

        //}
        [HttpGet]
        public async Task< IActionResult> GetAllCustomers()
        {
            
            try
            {
                string SerializeList = string.Empty;

                string keyName = "Master";
                string searchedValue = "FName";

                // Define the Lua script
                string luaScript = "return redis.call('GET', KEYS[1], ARGV[1])";

                // Create the Lua script with the LuaScript class
                LuaScript script = LuaScript.Prepare(luaScript);

                // Execute the script and get the result
                RedisValue result = (RedisValue)script.Evaluate(_database, new { keys = new RedisKey[] { keyName }, args = new RedisValue[] { searchedValue } });


         

                if (result.HasValue)
                {
                    return Ok(result.ToString());
                }
                else
                {
                    var customers = _repository.Customer.GetAllCustomers();
                    if (customers != null)
                    {
                        SerializeList = JsonConvert.SerializeObject(customers);
                        //EncodedList = Encoding.UTF8.GetBytes(SerializeList);
                        //var Option = new DistributedCacheEntryOptions()
                        //    .SetSlidingExpiration(TimeSpan.FromMinutes(20)) // After 20 min Entry will be Inactive
                        //    .SetAbsoluteExpiration(DateTime.Now.AddHours(6)); // Expired in 6 hour
                         _database.StringSet(keyName, SerializeList);
                        return Ok(customers);
                    }
                    else
                    {
                        return Ok(null);
                    }

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
