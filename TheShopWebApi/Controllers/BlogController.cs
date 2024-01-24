using Core.Data.Dtos;
using Core.Data.Entities;
using Core.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;

namespace TheCustomerCareWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly RepositoryContext _context;
        public BlogController(RepositoryContext repositoryContext)
        {
            _context = repositoryContext;
        }
        [HttpGet]
        public async Task<PayloadCustom<Blog>> GetAll()
        {
            try
            {
                var complaints = await _context.Blogs.Include(n => n.Images).ToListAsync();
                if (complaints != null)
                {
                    return new PayloadCustom<Blog>()
                    {
                        EntityList = complaints,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                else
                {
                    return new PayloadCustom<Blog>()
                    {

                        Status = (int)HttpStatusCode.NoContent,
                    }; ;
                }

            }
            catch (Exception ex)
            {
                return new PayloadCustom<Blog>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }

        [HttpPost("CreateBlog")]
        public async Task<PayloadCustom<Blog>> CreateBlog()
        {
            try
            {
                var blog = new Blog();
                blog.Heading = Request.Form["heading"];
                blog.Description = Request.Form["description"];

                var blogImages = new List<Image>();
                var fileName = "";
                var isFile = Request.Form.Files.Count;
                if (isFile > 0)
                {
                    var postedFiles = Request.Form.Files;
                    var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
                    foreach (var file in postedFiles)
                    {
                        var image = new Image();
                        fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName?.Trim('"');
                        var finalPath = Path.Combine(uploadFolder, fileName);
                        using (var fileStream = new FileStream(finalPath, FileMode.Create))
                        {
                            file.CopyTo(fileStream);
                        }
                        image.ImageData = fileName;
                        blogImages.Add(image);
                    }

                }
                blog.Images = blogImages;
                await _context.Blogs.AddAsync(blog);
                await _context.SaveChangesAsync();
                return new PayloadCustom<Blog>()
                {
                    Entity = blog,
                    Status = (int)HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<Blog>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.BadRequest,
                };
            }

        }

        [HttpDelete("{id}")]
        public async Task<PayloadCustom<string>> DeleteBlog(Guid id)
        {
            try
            {
                var blog = await _context.Blogs.Where(n => n.Id == id).FirstOrDefaultAsync();

                var images = await _context.Images.Where(n => n.BlogId == id).ToListAsync();
                if(images.Count > 0)
                {
                    _context.RemoveRange(images);
                    await _context.SaveChangesAsync();
                }

              
                _context.Blogs.Remove(blog);
                await _context.SaveChangesAsync();

                return new PayloadCustom<string>()
                {

                    Status = (int)HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<string>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }



    }
}
