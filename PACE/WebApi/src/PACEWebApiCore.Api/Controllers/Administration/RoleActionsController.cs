using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using System.Collections.Generic;
using PACEWebApiCore.Api.Helpers;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/roleactions")]
    public class RoleActionsController : BaseController<RoleAction>
    {
        public RoleActionsController(IDataRepository<RoleAction> repository) : base(repository)
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

        [Route("post"),HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] RoleAction roleAction)
        {
            return InsertEntity(roleAction);
        }

        [Route("postlist"),HttpPost]
        [Authorize]
        public IActionResult PostList([FromBody] List<RoleAction> roleActions)
        {
            return Ok(InsertEntityList(roleActions));  
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
        public IActionResult Update([FromBody] RoleAction roleAction)
        {
            return UpdateEntity(roleAction); // or return UpdateEntityAsync(account)          
        }
    }
}
