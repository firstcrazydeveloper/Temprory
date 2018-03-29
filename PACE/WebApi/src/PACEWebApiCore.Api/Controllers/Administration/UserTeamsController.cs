using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using System.Collections.Generic;
using PACEWebApiCore.Api.Helpers;


namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/userteams")]
    public class UserTeamsController : BaseController<UserTeam>
    {
        public UserTeamsController(IDataRepository<UserTeam> repository) : base(repository)
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

        [HttpPost]
        [Authorize]
        [Route("")]
        public IActionResult Post([FromBody] UserTeam userTeam)
        {
            return InsertEntity(userTeam);
        }

        [Route("postlist"), HttpPost]
        [Authorize]
        public IActionResult PostList([FromBody] List<UserTeam> userTeams)
        {
            return Ok(InsertEntityList(userTeams));
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
        public IActionResult Update([FromBody] UserTeam userTeam)
        {
            return UpdateEntity(userTeam); // or return UpdateEntityAsync(account)          
        }
    }
}
