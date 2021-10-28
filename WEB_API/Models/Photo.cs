using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PropertyBrokerWebApp.Models
{
    [Table("Photos")]
    public class Photo:BaseEntity
    {
        [Required]
        public string ImageUrl { get; set; }
        [Required]
        public string PublicId { get; set; }
        public bool IsPrimary { get; set; }
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }
}