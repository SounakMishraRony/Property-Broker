using System.ComponentModel.DataAnnotations;

namespace PropertyBrokerWebApp.Models
{
    public class FurnishingType:BaseEntity
    {
        [Required]
        public string Name { get; set; }
    }
}