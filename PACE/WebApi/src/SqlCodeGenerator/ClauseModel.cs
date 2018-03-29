using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace SqlCodeGenerator
{
    public class ClauseModel
    {
        public string Name { get; set; }
        public string Sql { get; set; }
        public object Parameters { get; set; }
        public string Joiner { get; set; }
        public string Prefix { get; set; } = string.Empty;
        public string Postfix { get; set; } = string.Empty;
        public bool IsInclusive { get; set; } = false;
    }
}