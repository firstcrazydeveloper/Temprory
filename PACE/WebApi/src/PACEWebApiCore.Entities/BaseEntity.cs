using System;
using GenericRepository.Interfaces;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities
{
    public class BaseEntity : IEntity
    {
        protected BaseEntity()
        {
            Created = DateTime.UtcNow;
            Modified = DateTime.UtcNow;
        }

        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }

        [NonStored] public int TotalCount { get; set; }
    }
}