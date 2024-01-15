using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Data;
using Core.Data.Entities;
using Core.Data.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace TheCustomerCareWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly RepositoryContext _context;
        public UserController(RepositoryContext repositoryContext)
        {
            _context = repositoryContext;
        }
        [HttpGet]
        public async Task<PayloadCustom<User>> GetAll()
        {
            try
            {
                var users =await _context.Users.ToListAsync();
                if (users != null)
                {
                    return new PayloadCustom<User>()
                    {
                        EntityList = users,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                else
                {
                    return new PayloadCustom<User>()
                    {
                       
                        Status = (int)HttpStatusCode.NoContent,
                    }; ;
                }

            }
            catch (Exception ex)
            {
                return  new PayloadCustom<User>()
                {
                    Message=ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                }; 
            }
        }

        [HttpGet("{id}", Name = "GetUserById")]
        public async Task<PayloadCustom<User>> GetUserById(Guid id)
        {
            try
            {
                
                var user =await _context.Users.Where(n=>n.Id==id).FirstOrDefaultAsync();
                if (user != null)
                {
                    return new PayloadCustom<User>()
                    {
                        Entity = user,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                else
                {
                    return new PayloadCustom<User>()
                    {
                        Status = (int)HttpStatusCode.NotFound,
                    };
                }
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }

       

        [HttpPost]
        public async Task<PayloadCustom<User>> CreateUser([FromBody] User user )
        {

            try
            {
                var data=await _context.Users.Where(n=>n.Email==user.Email).FirstOrDefaultAsync();
                if(data!=null)
                {
                    return new PayloadCustom<User>()
                    {
                        Message="Email already Exists",
                        Status = (int)HttpStatusCode.NotAcceptable,
                    };
                }
                var newUser=new User() { FirstName=user.FirstName,LastName=user.LastName,Email=user.Email,Password=user.Password,Address=user.Address,Phone=user.Phone,Role=user.Role};

                _context.Users.Add(user);
                _context.SaveChanges();


                return  new PayloadCustom<User>()
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.OK,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }
        [HttpPost("ValidateUser")]
        public async Task<PayloadCustom<User>> ValidateUser([FromBody] UserLoginDto user)
        {

            try
            {
               
                var response =await _context.Users.Where(n=>n.Email==user.Email && n.Password == user.Password).Select(n => new User{ Id=n.Id,FirstName= n.FirstName,LastName= n.LastName,Email=n.Email,Role=n.Role}).FirstOrDefaultAsync();
                if (response != null)
                {
                    return new PayloadCustom<User>()
                    {
                        Entity = response,
                        Status = (int)HttpStatusCode.OK,
                    };

                }
                return new PayloadCustom<User>()
                {
                    Status = (int)HttpStatusCode.Unauthorized,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }
        [HttpPut]
        public async Task<PayloadCustom<User>> UpdateUser([FromBody] User user)
        {
            try
            {
               
                _context.Update(user);
                var data=await _context.SaveChangesAsync();
                if (data > 0)
                {
                    return new PayloadCustom<User>()
                    {
                        Entity = user,
                        Status = (int)HttpStatusCode.OK,
                    };
                }
                return new PayloadCustom<User>()
                {
                    Entity = user,
                    Status = (int)HttpStatusCode.BadGateway,
                };
            }
            catch (Exception ex)
            {
                return new PayloadCustom<User>()
                {
                    Message = ex.Message,
                    Status = (int)HttpStatusCode.InternalServerError,
                };
            }
        }

        [HttpDelete("{id}")]
        public async Task<PayloadCustom<string>> DeleteUser(Guid id)
        {
            try
            {
                var user =await _context.Users.Where(n=>n.Id==id).FirstOrDefaultAsync();

                if (user == null)
                {
                    return new PayloadCustom<string>()
                    {
                       
                        Status = (int)HttpStatusCode.NotFound,
                    };
                }

                _context.Users.Remove(user);
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
