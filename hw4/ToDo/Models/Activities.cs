using System;
using System.Collections.Generic;

namespace ToDo.Models
{
    public partial class Activities
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? UserId { get; set; }
        public DateTime? When { get; set; }
    }
}
