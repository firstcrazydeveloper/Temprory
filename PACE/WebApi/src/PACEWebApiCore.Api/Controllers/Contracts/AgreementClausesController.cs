using System.Collections.Generic;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Contracts;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Contracts
{
    [Route("api/agreements")]
    public class AgreementClausesController : BaseController<AgreementClause>
    {
        public AgreementClausesController(IDataRepository<AgreementClause> repository) : base(repository)
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
        public IActionResult Post([FromBody] AgreementClause agreementClause)
        {
            return InsertEntity(agreementClause);
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
        public IActionResult Update([FromBody] AgreementClause agreementClause)
        {
            return UpdateEntity(agreementClause); // or return UpdateEntityAsync(account)          
        }
    }
}