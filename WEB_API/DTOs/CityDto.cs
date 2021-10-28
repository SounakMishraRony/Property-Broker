using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyBrokerWebApp.DTOs
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required (ErrorMessage ="Name is mandatory")]
        [StringLength(50,MinimumLength =2)]
        public string Name { get; set; }
        [Required]
        [StringLength(5)]
        public string Country { get; set; }
    }
}
