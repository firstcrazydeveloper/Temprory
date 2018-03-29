using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/employees")]
    public class EmployeesController : BaseController<Employee>
    {
        public EmployeesController(IDataRepository<Employee> repository) : base(repository)
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
        public IActionResult Post([FromBody] Employee employee)
        {
            return InsertEntity(employee);
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
        public IActionResult Update([FromBody] Employee employee)
        {
            return UpdateEntity(employee); // or return UpdateEntityAsync(account)          
        }
    }
}