using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ToDo.Models;
using ToDo.DTOs;

namespace ToDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly ILogger<ActivitiesController> _logger;

        public ActivitiesController(ILogger<ActivitiesController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Authorize(Roles = "user")]
        public IActionResult Post([FromBody] DTOs.Activity data)
        {
            var db = new ToDoDbContext();

            var a = new Models.Activity();
            a.UserId = Convert.ToUInt32(User.Identity.Name);
            a.Name = data.Name;
            a.When = data.When;
            db.Activity.Add(a);
            db.SaveChanges();

            return Ok(new { id = a.Id });
        }

        [HttpGet]
        [Authorize(Roles = "user")]
        public IActionResult Get()
        {
            var db = new ToDoDbContext();

            var activities = from x in db.Activity
                             where x.UserID == Convert.ToUInt(User.Identity.Name)
                             orderby x.When
                             select new
                             {
                                 name = x.Name,
                                 when = x.When
                             };

            if (!activities.Any()) return NoContent();

            return Ok(activities);
        }
    }
}