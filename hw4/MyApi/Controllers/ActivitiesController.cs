using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IConfiguration _config;

        public ActivitiesController(IConfiguration config)
        {
            _config = config;
        }

        string connStr => _config.GetConnectionString("DefaultConnection");

        // GET /activities
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var list = new List<object>();

            using var conn = new MySqlConnection(connStr);
            await conn.OpenAsync();

            var cmd = new MySqlCommand("SELECT * FROM activities", conn);
            var reader = await cmd.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                list.Add(new
                {
                    id = reader.GetInt32("id"),
                    name = reader.GetString("name"),
                    userId = reader.GetInt32("userId"),
                    when = reader.GetDateTime("when")
                });
            }

            return Ok(list);
        }

        // POST /activities
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] dynamic data)
        {
            using var conn = new MySqlConnection(connStr);
            await conn.OpenAsync();

            var cmd = new MySqlCommand(
                "INSERT INTO activities (name, userId, `when`) VALUES (@name, @userId, @when)", conn);

            cmd.Parameters.AddWithValue("@name", (string)data.name);
            cmd.Parameters.AddWithValue("@userId", (int)data.userId);
            cmd.Parameters.AddWithValue("@when", (DateTime)data.when);

            await cmd.ExecuteNonQueryAsync();

            return Ok();
        }
    }
}
