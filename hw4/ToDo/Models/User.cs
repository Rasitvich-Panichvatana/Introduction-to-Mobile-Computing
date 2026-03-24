using System;
using System.Collections.Generic;

namespace ToDo.Models
{
    public partial class User
    {
        public uint Id { get; set; }
        public string? NationalId { get; set; }
        public string? Salt { get; set; }
        public string? HashedPassword { get; set; }
        public string? Title { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
