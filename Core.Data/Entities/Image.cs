using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Data.Entities
{
    public class Image
    {
        public Guid Id { get; set; }

        [MaxLength]
        public string ImageData { get; set; }

        public Guid? ComplaintId { get; set; }
        public Complaint Complaint { get; set; }
        public Guid? BlogId { get; set; }
        public Blog Blog { get; set; }
        
    }
}
