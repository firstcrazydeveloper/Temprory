using SqlCodeGenerator.Attributes;
using System.ComponentModel.DataAnnotations;

namespace PACEWebApiCore.Entities.Administration
{
    public class Address : BaseEntity
    {
        [KeyProperty(Identity = true)] public int Id { get; set; }
        [Required] public int AddressTypeId { get; set; }
        public int? PropertyTypeId { get; set; }
        public int? SubPropertyTypeId { get; set; }
        [Required] public int StreetTypeId { get; set; }
        [Required] public int SuburbId { get; set; }
        [MaxLength(250)] public string PropertyName { get; set; }
        [MaxLength(3)] public string BlockNo { get; set; }
        [MaxLength(10)] public string LotNo { get; set; }
        [MaxLength(10)] public string Floor { get; set; }
        [MaxLength(10)] public string Unit { get; set; }
        [MaxLength(10)] public string StreetNo { get; set; }
        [MaxLength(50)] public string StreetName { get; set; }
        [MaxLength(50)] public string Longitude { get; set; }
        [MaxLength(50)] public string Latitude { get; set; }
        [MaxLength(50)] public string GeoResults { get; set; }
        [MaxLength(50)] public string TitleReference { get; set; }
        [MaxLength(50)] public string Section { get; set; }
    }
}