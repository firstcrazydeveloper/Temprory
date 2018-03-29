using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/contacts")]
    public class ContactsController : BaseController<Contact>
    {
        public ContactsController(IDataRepository<Contact> repository) : base(repository)
        {
        }

        [Route("{id:int}"), HttpGet]
        [Authorize]
        public IActionResult Get(int id) => GetEntity(id);

        [Route("list"), HttpGet]
        [Authorize]
        public IActionResult GetList() => GetEntities();

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Contact contact) => InsertEntity(contact);

        [Route("paged")]
        [Authorize]
        [BindJson(typeof(PageFilter), "json")]
        public IActionResult GetEntitiesPaged(PageFilter json) =>
            // filter should be anonymous type provided ex -> new { Name = value, Name1 = value1 }
            GetPaged(json.Filter.ToDynamic(), json.Sortings, json.PageIndex, json.PageSize);

        [Route(""), HttpPut]
        [Authorize]
        public IActionResult Update([FromBody] Contact contact) => UpdateEntity(contact);
    }
}