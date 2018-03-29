using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.ApplicationInsights.AspNetCore.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;

namespace PACEWebApiCore.Api.Helpers
{
    [AttributeUsage(AttributeTargets.Method)]
    public sealed class BindJsonAttribute : ActionFilterAttribute
    {
        private readonly string _queryStringKey;
        private readonly Type _type;

        public BindJsonAttribute(Type type, string queryStringKey)
        {
            _type = type;
            _queryStringKey = queryStringKey;
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var uri = context.HttpContext.Request.GetUri();

            var query = QueryHelpers.ParseQuery(uri.Query);
            var items = query.SelectMany(x => x.Value, (col, value) => new KeyValuePair<string, string>(col.Key, value)).ToList();
            var json = items[0].Value;
            var obj = JsonConvert.DeserializeObject(json,_type);
            context.ActionArguments[_queryStringKey] = obj;

        }
    }
}
