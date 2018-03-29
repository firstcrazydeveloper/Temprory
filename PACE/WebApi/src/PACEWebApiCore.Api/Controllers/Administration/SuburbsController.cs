using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;

namespace PACEWebApiCore.Api.Controllers.Administration
{
    [Route("api/suburbs")]
    public class SuburbsController : BaseController<Suburb>
    {
        public SuburbsController(IDataRepository<Suburb> repository) : base(repository)
        {
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [Route("{id:int}"), HttpGet]
        [Authorize]
        public IActionResult Get(int id) => GetEntity(id);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
        [Route("search"), HttpGet]
        [Authorize]
        public IActionResult Search(string propertyName, string searchTerm) => GetSearch(propertyName, searchTerm);
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        [Route("list"), HttpGet]
        [Authorize]
        public IActionResult GetList() => GetEntities();
        /// <summary>
        /// 
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] Suburb suburb) => InsertEntity(suburb);

        [Route("paged")]
        [Authorize]
        [BindJson(typeof(PageFilter), "json")]
        public IActionResult GetEntitiesPaged(PageFilter json) => GetPaged(json.Filter.ToDynamic(), json.Sortings, json.PageIndex, json.PageSize);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        [Route(""), HttpPut]
        [Authorize]
        public IActionResult Update([FromBody] Suburb suburb) => UpdateEntity(suburb);
    }
}