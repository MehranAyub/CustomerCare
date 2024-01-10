using Core.Application;
using Core.Application.Orders.OrderDtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TheShopWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Order : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public Order(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;

        }
        [HttpGet("GetAllOrders")]
        public IActionResult GetAllOrders()
        {
            try
            {
                var orders = _repository.Order.GetAllOrders();
            
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }

        [HttpGet("OrdersByUserId/{id}", Name = "OrdersByUserId")]
        public IActionResult GetOrderById(int id)
        {
            try
            {
                var order = _repository.Order.GetOrderById(id);
                if (order == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(order);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpGet("{id}/detail")]
        public IActionResult GetOrderWithDetails(int id)
        {
            try
            {
                var order = _repository.Order.GetOrderWithDetails(id);
                if (order == null)
                {
                    return NotFound();
                }

                return new JsonResult(order);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpPost("createOrder")]
        public IActionResult CreateOrder([FromBody] OrderDto order)
        {
            try
            {
                if (order == null)
                {
                    return BadRequest("Order object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



                _repository.Order.CreateOrder(order);
                _repository.Save();

                //return CreatedAtRoute("CustomerById", new { id = order.Id }, order);
                return Ok("CustomerById");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }


        [HttpPut("OrderActions")]
        public IActionResult OrderActions([FromBody] OrderListDto action)
        {
          
            try
            {
                _repository.Order.OrderActions(action);
                _repository.Save();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }
    }
}
