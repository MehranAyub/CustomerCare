using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Data;
using Core.Data.Entities;

namespace TheCustomerCareWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly RepositoryContext _context;
        public Users(RepositoryContext repositoryContext)
        {
            _context = repositoryContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var customers = _context.Users.ToList();
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

        [HttpGet("{id}", Name = "UserById")]
        public IActionResult GetUserById(Guid id)
        {
            try
            {
                
                var user =_context.Users.Where(n=>n.Id==id).FirstOrDefault();
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

       

        [HttpPost]
        public IActionResult CreateUser([FromBody] User user )
        {

            try
            {
                if (user == null)
                {
                    return BadRequest("Customer object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



                _context.Users.Add(user);
                _context.SaveChanges();


                return CreatedAtRoute("CustomerById", new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }
        //[HttpPost("ValidateCustomer")]
        //public IActionResult ValidateCustomer([FromBody] CustomerDto customer)
        //{

        //    try
        //    {
        //        if (customer == null)
        //        {
        //            return BadRequest("Customer object is null");
        //        }

        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest("Invalid model object");
        //        }



        //        var response = _repository.Customer.ValidateCustomer(customer);
        //        return Ok(response);

        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error" + ex);
        //    }
        //}
        //[HttpPut]
        //public IActionResult UpdateCustomer([FromBody] Core.Data.Entities.Customer customer)
        //{
        //    try
        //    {
        //        if (customer == null)
        //        {
        //            return BadRequest("customer object is null");
        //        }

        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest("Invalid model object");
        //        }



        //        _repository.Customer.UpdateCustomer(customer);
        //        _repository.Save();

        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error " + ex);
        //    }
        //}

        //[HttpDelete("{id}")]
        //public IActionResult DeleteCustomer(int id)
        //{
        //    try
        //    {
        //        var customer = _repository.Customer.GetCustomerById(id);

        //        if (customer == null)
        //        {
        //            return NotFound();
        //        }

        //        _repository.Customer.DeleteCustomer(customer);
        //        _repository.Save();

        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error " + ex);
        //    }
        //}
    }
}
