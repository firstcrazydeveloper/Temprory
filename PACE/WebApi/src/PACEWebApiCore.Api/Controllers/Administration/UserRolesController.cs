using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using System.Collections.Generic;
using PACEWebApiCore.Api.Helpers;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/userroles")]
    public class UserRolesController : BaseController<UserRole>
    {
        public UserRolesController(IDataRepository<UserRole> repository) : base(repository)
        {
        }

        [Route("{id:int}"), HttpGet]
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

        [Route("getbyroleid"), HttpGet]
        [Authorize]
        public IActionResult GetAsync(string Id)
        {
            object filter = new { RoleId = Id };

            return GetEntityWhere(filter);
        }

        [HttpPost]
        [Authorize]
        [Route("")]
        public IActionResult Post([FromBody] UserRole userRole)
        {
            return InsertEntity(userRole);
        }

        [Route("postlist"), HttpPost]
        [Authorize]
        public IActionResult PostList([FromBody] List<UserRole> userRoles)
        {
            return Ok(InsertEntityList(userRoles));
        }

        [Route("paged")]
        [Authorize]
        [BindJson(typeof(PageFilter), "json")]
        public IActionResult GetEntitiesPaged(PageFilter json)
        {
            // filter should be anonymous type provided ex -> new { Name = value, Name1 = value1 }
            return GetPaged(json.Filter.ToDynamic(), json.Sortings, json.PageIndex, json.PageSize);
        }

        [Route(""), HttpPut]
        [Authorize]
        public IActionResult Update([FromBody] UserRole userRole)
        {
            return UpdateEntity(userRole); // or return UpdateEntityAsync(account)          
        }
    }
}
