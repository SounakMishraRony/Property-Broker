using System.ComponentModel.DataAnnotations;

namespace PropertyBrokerWebApp.Models
{
    public class PropertyType:BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}