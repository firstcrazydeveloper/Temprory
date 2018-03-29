using System;
using System.Collections.Generic;
using System.Text;
using SqlCodeGenerator.Attributes;

namespace PACEWebApiCore.Entities.Enums
{
    public enum RecordStatus
    {
        Active = 0,

        [Deleted] Inactive = 1
    }
}