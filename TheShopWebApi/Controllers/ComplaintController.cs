using Core.Data.Dtos;
using Core.Data.Entities;
using Core.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Runtime.Intrinsics.Arm;

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
                var complaints = await _context.Complaints.Include(n=>n.Images).ToListAsync();
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
        [HttpPost("GetComplaintsByUserId")]
        public async Task<PayloadCustom<Complaint>> GetComplaintsByUserId(string userId)
        {
            try
            {
                var Id=new Guid(userId);
                var complaints = await _context.Complaints.Where(n=>n.CustomerId== Id || n.AgentId== Id).ToListAsync();
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
        [HttpPost("CreateComplaint")]
        public async Task<PayloadCustom<Complaint>> CreateComplaint()
        {
            try
            {
                var complaint = new Complaint();
                 complaint.Type = Request.Form["type"];
                complaint.Subject = Request.Form["subject"];
                complaint.Description = Request.Form["description"];
                complaint.CustomerId = new Guid(Request.Form["customerId"]);

                var complaintImages = new List<Image>();
                var fileName = "";
                var isFile = Request.Form.Files.Count;
                if (isFile > 0)
                {
                    var postedFiles = Request.Form.Files;
                    var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "Assets");
                    foreach (var file in postedFiles)
                    {
                        var image=new Image();
                        fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName?.Trim('"');
                        var finalPath = Path.Combine(uploadFolder, fileName);
                        using (var fileStream = new FileStream(finalPath, FileMode.Create))
                        {
                            file.CopyTo(fileStream);
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

        private IEnumerable<string> ProcessFiles(IEnumerable<IFormFile> files, string sourcePath, string destinationPath, string urlBase)
        {
            List<string> fileUrls = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    var sourceFilePath = Path.Combine(sourcePath, fileName);
                    var destinationFilePath = Path.Combine(destinationPath, fileName);

                    // Move the file
                    System.IO.File.Move(sourceFilePath, destinationFilePath);

                    // Generate URL
                    var fileUrl = Path.Combine(urlBase, fileName);
                    fileUrls.Add(fileUrl);
                }
            }

            return fileUrls;
        }




    }
}
