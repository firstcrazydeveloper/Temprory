using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Employee : BaseEntity
    {
        [KeyProperty(Identity = true)] public int EmployeeId { get; set; }
        [Required] [MaxLength(15)] public string EmployeeCode { get; set; }
        [Required] [MaxLength(50)] public string Surname { get; set; }
        [Required] [MaxLength(50)] public string GivenName { get; set; }
        [MaxLength(256)] public string JobTitle { get; set; }
        [Required] public int OfficeId { get; set; }
        [Required] public int DepartmentId { get; set; }
        [MaxLength(128)] public string DomainName { get; set; }
        [MaxLength(128)] public string Username { get; set; }
        [MaxLength(80)] public string Email { get; set; }
        [MaxLength(15)] public string LicenseNo { get; set; }
        [MaxLength(20)] public string Mobile { get; set; }
        [MaxLength(30)] public string Telephone { get; set; }
        [Required] public int CountryId { get; set; }
        [Required] public int Status { get; set; }
    }
}