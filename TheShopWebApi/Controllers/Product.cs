using Core.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace TheShopWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Product : ControllerBase
    {
        private readonly IRepositoryWrapper _repository;

        public Product(IRepositoryWrapper repositoryWrapper)
        {
            _repository = repositoryWrapper;

        }
        [HttpGet]
        public IActionResult GetAllProducts()
        {
            try
            {
                var products = _repository.Product.GetAllProducts();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }

        [HttpGet("{id}", Name = "ProductById")]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var product = _repository.Product.GetProductById(id);
                if (product == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(product);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpPost]
        public IActionResult CreateProduct()
        {
            try { 
                var product = JsonConvert.DeserializeObject<Core.Data.Entities.Product>(Request.Form["form"]) ?? new Core.Data.Entities.Product();
                var fileName = "";
                var isFile = Request.Form.Files.Count;
                if (isFile > 0)
                {
                    var postedFile = Request.Form.Files[0];
                    if (postedFile.Length > 0)
                    {
                        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
                        fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition).FileName?.Trim('"');
                        var finalPath = Path.Combine(uploadFolder, fileName);
                        using (var fileStream = new FileStream(finalPath, FileMode.Create))
                        {
                            postedFile.CopyTo(fileStream);
                        }
                        product.Image = fileName;
                    }

                }


            if (product.Id == 0)
            {
               
                _repository.Product.CreateProduct(product);
                _repository.Save();
                    return Ok(product);
                }
            else
            {
                UpdateProduct(product);
                    return StatusCode(250); //Status code if object is updated succefully
                }
            
        }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }
      

        [HttpPut]
        public IActionResult UpdateProduct([FromBody] Core.Data.Entities.Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("product object is null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }



                _repository.Product.UpdateProduct(product);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _repository.Product.GetProductById(id);

                if (product == null)
                {
                    return NotFound();
                }

                _repository.Product.DeleteProduct(product);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }
        [HttpGet("DashboardCall")]
        public IActionResult DashboardCall()
        {
            try
            {
                var count = _repository.Product.Counts();

                if (count == null)
                {
                    return NotFound();
                }
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error " + ex);
            }
        }
    }
}
