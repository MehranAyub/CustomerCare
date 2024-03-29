﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class Blog
    {
        public Guid Id { get; set; }
        public string Heading { get; set; }
        public string Description { get; set; }
        public List<Image> Images { get; set; }=new List<Image>();
    }

}
