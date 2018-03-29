using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;


namespace PACEWebApiCore.Api.Controllers.Administration
{

    [Route("api/teamliaison")]
    public class TeamLiaisonController : BaseController<TeamLiaison>
    {
        public TeamLiaisonController(IDataRepository<TeamLiaison> repository) : base(repository)
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
        public IActionResult Post([FromBody] TeamLiaison teamLiasion)
        {
            return InsertEntity(teamLiasion);
        }

        [Route("paged")]
        [Authorize]
        [BindJson(typeof(PageFilter), "json")]
        public IActionResult GetEntitiesPaged(PageFilter json)
        {
            return GetPaged(json.Filter, json.Sortings, json.PageIndex, json.PageSize);
        }

        [Route(""), HttpPut]
        [Authorize]
        public IActionResult Update([FromBody] TeamLiaison team)
        {
            return UpdateEntity(team);        
        }
    }
}