using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PACEWebApiCore.Utilities;
using Serilog;


namespace PACEWebApiCore.Api.Controllers
{
    public abstract class BaseController<T> : Controller where T : IEntity, new()
    {
        private readonly IDataRepository<T> _repository;

        protected BaseController(IDataRepository<T> repository)
        {
            _repository = repository;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual IActionResult GetEntity(int id)
        {
            try
            {
                var entity = _repository.Get(id);
                if (entity != null)
                {
                    return Ok(entity);
                }

                Log.Information("For Get() Entity {entity} not found for Identifier {id}", typeof(T).Name, id);
                return new NotFoundObjectResult(id);
            }
            catch (Exception ex)
            {
                Log.Error("For {name} : {id} '{message}': occured.", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name}  Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
        public virtual IActionResult GetSearch(string propertyName, string searchTerm)
        {
            try
            {
                var entities = _repository.GetSearch(propertyName, searchTerm);
                if (entities != null)
                {
                    return Ok(entities);
                }

                Log.Information("For GetSearch({propertyName}, {searchTerm}) Entity {entity} not found ", propertyName, searchTerm, typeof(T).Name);
                return new NotFoundObjectResult(nameof(propertyName));
            }
            catch (Exception ex)
            {
                Log.Error("For GetSearch({propertyName}, {searchTerm}) Entity {entity} error {err}", propertyName, searchTerm, typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name}  Found");
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual IActionResult GetEntityAsync(int id)
        {
            try
            {
                var entity = _repository.GetAsync(id);
                if (entity != null)
                {
                    return Ok(entity);
                }

                Log.Information("For GetAsync() Entity {entity} not found for Identifier {id}", typeof(T).Name, id);
                return new NotFoundObjectResult(id);
            }
            catch (Exception ex)
            {
                Log.Error("For {name} : {id} '{message}': occured.", typeof(T).Name, id, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name}  Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public virtual IActionResult GetEntityWhere(object filter)
        {
            try
            {
                var entity = _repository.GetWhere(filter).ToList();
                if (!entity.Any())
                {
                    Log.Information("For GetEntityWhere() Entity {entity} not found for Filter {filter}",
                        typeof(T).Name, filter);
                    return new NotFoundObjectResult(filter);
                }

                return Ok(entity);
            }
            catch (Exception ex)
            {
                Log.Error("For GetEntityWhere() for {name} '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entities of Type {typeof(T).Name} Found");
            }
        }

        public virtual IActionResult GetEntityWhereAsync(object filter)
        {
            try
            {
                var entity = _repository.GetWhereAsync(filter);
                var list = entity.Result.ToList();
                return Ok(list);
            }
            catch (Exception ex)
            {
                Log.Error("For GetEntityWhere() for {name} error '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entities of Type {typeof(T).Name} Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual IActionResult GetEntities()
        {
            try
            {
                var entities = _repository.GetList();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                Log.Error("For GetList() of Type {name} error '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entities: {typeof(T).Name}  Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual IActionResult GetEntitiesAsync()
        {
            try
            {
                var entities = _repository.GetListAsync();
                return Ok(entities);
            }
            catch (Exception ex)
            {
                Log.Error("For GetListAsync() of Type {name} error '{message}' occured", typeof(T).Name, ex.Message,
                    ex);
                return BadRequest($"No Entities: {typeof(T).Name}  Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual IActionResult InsertEntity(T entity)
        {
            try
            {
                var isInserted = _repository.Insert(entity);
                return Ok(isInserted);
            }
            catch (Exception ex)
            {
                Log.Error("For InsertEntity() {entity} '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name} Inserted");
            }
        }

        /// <summary>
        /// this method inserts the collection 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual IActionResult InsertEntityList(List<T> entity)
        {
            try
            {
                var isInserted = _repository.InsertList(entity);
                return Ok(isInserted);
            }
            catch (Exception ex)
            {
                Log.Error("For InsertEntity() {entity} '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name} Inserted");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual IActionResult InsertEntityAsync(T entity)
        {
            try
            {
                var isInserted = _repository.InsertAsync(entity);
                return Ok(isInserted);
            }
            catch (Exception ex)
            {
                Log.Error("For InsertEntityAsync() {entity} error '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"No Entity of Type {typeof(T).Name} Inserted");
            }
        }

              /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual IActionResult UpdateEntity(T entity)
        {
            try
            {
                var updated = _repository.Update(entity);
                return updated == null ? (IActionResult) new NotFoundObjectResult(entity) : Ok(updated);
            }
            catch (Exception ex)
            {
                Log.Error("For UpdateEntity() {entity} error '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"Entity of Type {typeof(T).Name} Not Updated");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual IActionResult DeleteEntity(object id)
        {
            try
            {
                _repository.Delete(id);
                return Ok($"Deleted: {id}");
            }
            catch (Exception ex)
            {
                Log.Error("For DeleteEntity() id:{id} of Type {name} '{message}' occured", id, typeof(T).Name,
                    ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual IActionResult DeleteEntityAsync(object id)
        {
            try
            {
                _repository.DeleteAsync(id);
                return Ok($"Deleted: {id}");
            }
            catch (Exception ex)
            {
                Log.Error("For DeleteEntityAsync() id:{id} of Type {name} '{message}' occured", id, typeof(T).Name,
                    ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<IActionResult> UpdateEntityAsync(T entity)
        {
            try
            {
                var updated = await _repository.UpdateAsync(entity);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                Log.Error("For UpdateEntityAsync() {entity} '{message}' occured", typeof(T).Name, ex.Message, ex);
                return BadRequest($"Entity of Type {typeof(T).Name} not Deleted");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="sortings"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual IActionResult GetPaged(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex,
            int pageSize)
        {
            try
            {
                var entities = _repository.GetPage(filter, sortings, pageIndex, pageSize);
                return Ok(entities);
            }
            catch (Exception ex)
            {
                Log.Error(
                    "For GetPaged() for page {index} and pageSize of {size} for Type {name} error '{message}' occured",
                    pageIndex, pageSize, typeof(T).Name, ex.Message, ex);
                return BadRequest($"Paged Entity of Type {typeof(T).Name} not Found");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="sortings"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public virtual IActionResult GetPagedAsync(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex,
            int pageSize)
        {
            try
            {
                var entities = _repository.GetPageAsync(filter, sortings, pageIndex, pageSize);
                return Ok(entities);
            }
            catch (Exception ex)
            {
                Log.Error(
                    "For GetPaged() for page {index} and pageSize of {size} for Type {name} error '{message}' occured",
                    pageIndex, pageSize, typeof(T).Name, ex.Message, ex);
                return BadRequest($"Paged Entity of Type {typeof(T).Name} not Found");
            }
        }
    }
}