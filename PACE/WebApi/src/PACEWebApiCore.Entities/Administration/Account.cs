using System.ComponentModel.DataAnnotations;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Administration
{
    public class Account : BaseEntity
    {
        /// <summary>
        /// 
        /// </summary>
        [KeyProperty(Identity = true)]
        public int Id { get; set; }

        [MaxLength(128)] public string Name { get; set; }

        [MaxLength(20)] public string Abn { get; set; }
    }
}