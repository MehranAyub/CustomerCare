using Core.Data.Dtos;
using Core.Data.Entities;
using Core.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace TheCustomerCareWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintController : ControllerBase
    {
        private readonly RepositoryContext _context;
        public ComplaintController(RepositoryContext repositoryContext)
        {
            _context = repositoryContext;
        }
        [HttpGet]
        public async Task<PayloadCustom<Complaint>> GetAll()
        {
            try
            {
                var complaints = await _context.Complaints.ToListAsync();
                if (complaints != null)
                {
                    return new PayloadCustom<Complaint>()
                    {
                        EntityList = complaints,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                else
                {
                    return new PayloadCustom<Complaint>()
                    {

                        Status = (int)HttpStatusCode.NoContent,
                    }; ;
                }

            }
            catch (Exception ex)
            {
                return new PayloadCustom<Complaint>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }

        [HttpGet("{id}", Name = "GetComplaintById")]
        public async Task<PayloadCustom<Complaint>> GetComplaintById(Guid id)
        {
            try
            {

                var complaint = await _context.Complaints.Where(n => n.Id == id).FirstOrDefaultAsync();
                if (complaint != null)
                {
                    return new PayloadCustom<Complaint>()
                    {
                        Entity = complaint,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                else
                {
                    return new PayloadCustom<Complaint>()
                    {
                        Status = (int)HttpStatusCode.NotFound,
                    };
                }
            }
            catch (Exception ex)
            {
                return new PayloadCustom<Complaint>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }
        [HttpPost]
        public async Task<PayloadCustom<Complaint>> CreateProduct()
        {
            try
            {
                var complaint = JsonConvert.DeserializeObject<Complaint>(Request.Form["form"]) ?? new Complaint();
                var complaintImages = new List<Image>();
                var fileName = "";
                var isFile = Request.Form.Files.Count;
                if (isFile > 0)
                {
                    var postedFile = Request.Form.Files[0];
                    if (postedFile.Length > 0)
                    {
                        var image=new Image();
                        var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
                        fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition).FileName?.Trim('"');
                        var finalPath = Path.Combine(uploadFolder, fileName);
                        using (var fileStream = new FileStream(finalPath, FileMode.Create))
                        {
                            postedFile.CopyTo(fileStream);
                        }
                        image.ImageData = fileName;
                        complaintImages.Add(image);
                    }

                }
                complaint.Images = complaintImages;
               await _context.Complaints.AddAsync(complaint);
                 await _context.SaveChangesAsync();
                return new PayloadCustom<Complaint>()
                {
                    Entity = complaint,
                    Status = (int)HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<Complaint>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.BadRequest,
                };
            }

        }

    }
}
