using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/accounts")]
    public class AccountsController : BaseController<Account>
    {
        public AccountsController(IDataRepository<Account> repository) : base(repository)
        {
        }

        [Route("{id:int}"), HttpGet]
        [Authorize]
        public IActionResult Get(int id) => GetEntity(id);

        [Route("search"), HttpGet]
        [Authorize]
        public IActionResult Search(string propertyName, string searchTerm) => GetSearch(propertyName, searchTerm);

        [Route("list"), HttpGet]
        [Authorize]
        public IActionResult GetList() => GetEntities();

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Account account) => InsertEntity(account);

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
        public IActionResult Update([FromBody] Account account) => UpdateEntity(account); // or return UpdateEntityAsync(account)          
    }
}