using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Contact : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        public int Prefix { get; set; }
        [Required] [MaxLength(50)] public string FirstName { get; set; }
        [Required] [MaxLength(50)] public string LastName { get; set; }
        [Required] [MaxLength(50)] public string Email { get; set; }
        [Required] [MaxLength(20)] public string Mobile { get; set; }
        [MaxLength(20)] public string Fax { get; set; }
        [MaxLength(20)] public string Phone { get; set; }
    }
}