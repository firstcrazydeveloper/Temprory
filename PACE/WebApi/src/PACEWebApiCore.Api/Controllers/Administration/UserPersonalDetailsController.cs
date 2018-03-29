using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/userpersonaldetails")]
    public class UserPersonalDetailsController : BaseController<UserPersonalDetails>
    {
        public UserPersonalDetailsController(IDataRepository<UserPersonalDetails> repository) : base(repository)
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
        public IActionResult Post([FromBody] UserPersonalDetails userDetailsPersonalDetail)
        {
            return InsertEntity(userDetailsPersonalDetail);
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
        public IActionResult Update([FromBody] UserPersonalDetails userPersonalDetail)
        {
            return UpdateEntity(userPersonalDetail); // or return UpdateEntityAsync(account)          
        }
    }
}