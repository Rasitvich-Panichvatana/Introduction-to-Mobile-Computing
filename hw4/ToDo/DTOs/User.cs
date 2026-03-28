namespace ToDo.DTOs
{
    public class User
    {
        public string NationalId { get; set; }
        public string Salt { get; set; }
        public string HashedPassword { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}