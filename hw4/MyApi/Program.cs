using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

// ✅ เพิ่มบรรทัดนี้ (สำคัญมาก)
builder.Services.AddControllers();

var app = builder.Build();

// ✅ เพิ่มบรรทัดนี้ (สำคัญมาก)
app.MapControllers();

// test route (เก็บไว้ก็ได้)
app.MapGet("/test-db", async (IConfiguration config) =>
{
    try
    {
        string connStr = config.GetConnectionString("DefaultConnection");

        using var conn = new MySqlConnection(connStr);
        await conn.OpenAsync();

        return "Database connected successfully 🎉";
    }
    catch (Exception ex)
    {
        return "Error: " + ex.Message;
    }
});

app.Run();
