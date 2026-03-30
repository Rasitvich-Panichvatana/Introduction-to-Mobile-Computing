using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using ToDo.DTOs;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

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

            // Check if user already exists
            var existingUser = db.User.FirstOrDefault(x => x.NationalId == data.NationalId);
            if (existingUser != null)
            {
                return BadRequest("User already exists");
            }

            // Generate salt
            byte[] saltBytes = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(saltBytes);
            }

            string salt = Convert.ToBase64String(saltBytes);

            // Hash password
            string hash = Convert.ToBase64String(
                KeyDerivation.Pbkdf2(
                    password: data.Password,
                    salt: saltBytes,
                    prf: KeyDerivationPrf.HMACSHA1,
                    iterationCount: 10000,
                    numBytesRequested: 256 / 8
                )
            );

            // Save user
            var user = new Models.User();
            user.NationalId = data.NationalId;
            user.Salt = salt;
            user.HashedPassword = hash;
            user.Title = data.Title;
            user.FirstName = data.FirstName;
            user.LastName = data.LastName;

            db.User.Add(user);
            db.SaveChanges();

            return Ok(new { id = user.Id });
        }


        [HttpGet]
        public IActionResult Get()
        {
            var db = new ToDoDbContext();

            var users = from x in db.User
                        orderby x.NationalId
                        select new
                        {
                            nationId = x.NationalId,
                            salt = x.Salt,
                            hashedPassword = x.HashedPassword,
                            title = x.Title,
                            firstName = x.FirstName,
                            lastName = x.LastName
                        };

            if (!users.Any()) return NoContent();

            return Ok(users);
        }
    }
}