using System;
using System.Collections.Generic;

namespace ToDo.Models
{
    public partial class Activity
    {
        public int Id { get; set; }
        public uint? UserId { get; set; }
        public string? Name { get; set; }
        public DateTime? When { get; set; }
    }
}
