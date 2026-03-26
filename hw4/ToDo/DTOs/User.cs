namespace ToDo.DTOs
{
    public class User
    {
        public char NationalId { get; set; }
        public char Salt { get; set; }
        public char HashedPassword { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}