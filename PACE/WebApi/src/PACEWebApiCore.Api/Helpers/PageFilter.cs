using System.Collections.Generic;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Helpers
{
    public class PageFilter
    {
        public object Filter { get; set; }
        public IEnumerable<SortDescriptor> Sortings { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }
}
