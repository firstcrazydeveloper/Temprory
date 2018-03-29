using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using System.Collections.Generic;
using PACEWebApiCore.Api.Helpers;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/roles")]
    public class RolesController : BaseController<Role>
    {
        public RolesController(IDataRepository<Role> repository) : base(repository)
        {
        }

        [Route("getbyid"), HttpGet]
        [Authorize]
        public IActionResult Get(int id)
        {
            return GetEntity(id);
        }

        [Route("list"), HttpGet]
        [Authorize]
        public IActionResult GetList()
        {
            return GetEntities();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Role role)
        {
            return InsertEntity(role);
        }

        [Route("paged")]
        [Authorize]
        [BindJson(typeof(PageFilter), "json")]
        public IActionResult GetEntitiesPaged(PageFilter json)
        {
            // filter should be anonymous type provided ex -> new { Name = value, Name1 = value1 }
            return GetPaged(json.Filter, json.Sortings, json.PageIndex, json.PageSize);
        }

        [Route(""), HttpPut]
        [Authorize]
        public IActionResult Update([FromBody] Role role)
        {
            return UpdateEntity(role); // or return UpdateEntityAsync(account)          
        }
    }
}
