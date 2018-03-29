using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PACEWebApiCore.Entities.Administration
{
    public class Suburb : BaseEntity
    {
       [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int StateId { get; set; }
        [Required] public int CountryTypeId { get; set; }
        [MaxLength(50)] public string District { get; set; }
        [MaxLength(50)] public string City { get; set; }
        [MaxLength(50)] public string SuburbName { get; set; }
        [MaxLength(10)] public string PostCode { get; set; }
        
    }

}
