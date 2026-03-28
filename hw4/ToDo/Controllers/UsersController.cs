using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using ToDo.DTOs;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post([FromBody] DTOs.User data)
        {
            var db = new ToDoDbContext();

            var a = new Models.User();
            a.NationalId = data.NationalId;
            a.Salt = data.Salt;
            a.HashedPassword = data.HashedPassword;
            a.Title = data.Title;
            a.FirstName = data.FirstName;
            a.LastName = data.LastName;

            db.User.Add(a);
            db.SaveChanges();

            return Ok(new { id = a.Id });
        }

        [HttpGet]
        public IActionResult Get()
        {
            var db = new ToDoDbContext();

            var users = from x in db.User
                        orderby x.NationalId
                        select new
                        {
                            nationid = x.NationalId,
                            salt = x.Salt,
                            hashedpassword = x.HashedPassword,
                            title = x.Title,
                            firstname = x.FirstName,
                            lastname = x.LastName
                        };

            if (!users.Any()) return NoContent();

            return Ok(activities);
        }
    }
}