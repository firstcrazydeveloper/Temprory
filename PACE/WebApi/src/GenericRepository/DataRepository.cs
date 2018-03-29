using GenericRepository.Interfaces;
using System;
using System.Collections.Generic;
using Autofac;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PACEWebApiCore.Utilities;
using SqlCodeGenerator;

namespace GenericRepository
{
    public class DataRepository<T> : DataConnection, IDataRepository<T> where T : new()
    {
        private readonly IComponentContext _context;
        private const CommandType CtProc = CommandType.StoredProcedure;
        private const CommandType CtText = CommandType.Text;

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <param name="context"></param>
        /// <param name="connection"></param>
        public DataRepository(IComponentContext context, IDbConnection connection) : base(connection) =>
            _context = context;

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual T Get(int id)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelect(new { Id = id });
            return Connection.Query<T>(sql, new { Id = id }, commandType: CtText).FirstOrDefault();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public virtual IEnumerable<T> GetList()
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelectAll();
            return Connection.Query<T>(sql, CtText);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public virtual async Task<IEnumerable<T>> GetListAsync()
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelectAll();
            return await Connection.QueryAsync<T>(sql, commandType: CtText);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="filters"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> Get(object filters)
        {
            return GetWhere(filters);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual async Task<T> GetAsync(int id)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelect(new { Id = id });
            var result = await Connection.QueryAsync<T>(sql, new { Id = id }, commandType: CtText);
            return result.FirstOrDefault();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public virtual IEnumerable<T> GetWhere(object filters)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelect(filters);
            return Connection.Query<T>(sql, filters, commandType: CtText);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<T>> GetWhereAsync(object filters)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelect(filters);
            return await Connection.QueryAsync<T>(sql, filters, commandType: CtText);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance"></param>
        public virtual T Insert(T instance)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetInsert();
            if (sqlGenerator.IsIdentity)
            {
                var newId = Connection.Query<decimal>(sql, instance, commandType: CtText).Single();
                var newParsedId = Convert.ChangeType(newId, sqlGenerator.IdentityProperty.PropertyInfo.PropertyType);
                sqlGenerator.IdentityProperty.PropertyInfo.SetValue(instance, newParsedId);
            }
            else
            {
                Connection.Execute(sql, instance, commandType: CtText);

            }

            return instance;
        }
        /// <summary>
        /// method to insert list of entities at a single go
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance"></param>
        public virtual List<T> InsertList(List<T> instance)
        {
            foreach (var t in instance)
            {
                var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
                var sql = sqlGenerator.GetInsert();
                if (sqlGenerator.IsIdentity)
                {
                    var newId = Connection.Query<decimal>(sql, t, commandType: CtText).Single();
                    var newParsedId = Convert.ChangeType(newId, sqlGenerator.IdentityProperty.PropertyInfo.PropertyType);
                    sqlGenerator.IdentityProperty.PropertyInfo.SetValue(t, newParsedId);
                }
                else
                {
                    Connection.Execute(sql, instance, commandType: CtText);

                }
            }

            return instance;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        public virtual bool Delete(object key)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetDelete();
            return Connection.Execute(sql, key, commandType: CtText) > 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance"></param>
        public virtual T Update(T instance)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetUpdate();
            Connection.Execute(sql, instance, commandType: CtText);
            return instance;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelectAll();
            return await Connection.QueryAsync<T>(sql, commandType: CtText);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filters"></param>
        /// <returns></returns>
        public virtual async Task<IEnumerable<T>> GetAsync(object filters)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelect(filters);
            var queryTask = Connection.QueryAsync<T>(sql, filters, commandType: CtText);
            var data = await queryTask;
            return data.ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        public virtual async Task<T> InsertAsync(T instance)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetInsert();
            if (sqlGenerator.IsIdentity)
            {
                var queryTask = Connection.QueryAsync<decimal>(sql, instance, commandType: CtText);
                var taskResult = await queryTask;
                var newId = taskResult.Single();

                var newParsedId = Convert.ChangeType(newId, sqlGenerator.IdentityProperty.PropertyInfo.PropertyType);
                sqlGenerator.IdentityProperty.PropertyInfo.SetValue(instance, newParsedId);
            }

            var queryAsync = await Connection.QueryAsync<T>(sql, instance, commandType: CtText);
            return instance;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public virtual async Task<bool> DeleteAsync(object key)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetDelete();
            var queryTask = Connection.QueryAsync<int>(sql, key, commandType: CtText);
            var result = await queryTask;
            return result.SingleOrDefault() > 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="instance"></param>
        /// <returns></returns>
        public virtual async Task<bool> UpdateAsync(T instance)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetUpdate();
            var queryTask = Connection.QueryAsync<int>(sql, instance, commandType: CtText);
            var result = await queryTask;
            return result.SingleOrDefault() > 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
        public IEnumerable<T> GetSearch(string propertyName, string searchTerm)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSearch(propertyName, searchTerm);
            return Connection.Query<T>(sql, commandType: CtText);
        }
        #region Custom Methods

        // Here you can add generic like methods which you need to implement for specific poco's
        // Possibly only handle the specific type that's expected


        public async Task<IEnumerable<T>> GetPageAsync(object filter, IEnumerable<SortDescriptor> sortings,
            int pageIndex = 1, int pageSize = 20)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelectPage(filter, sortings, pageIndex, pageSize);
            var queryTask = Connection.QueryAsync<T>(sql, filter, commandType: CtText);
            var result = await queryTask;
            return result.ToList();
        }

        public IEnumerable<T> GetPage(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex, int pageSize)
        {
            var sqlGenerator = _context.Resolve<ISqlGenerator<T>>();
            var sql = sqlGenerator.GetSelectPage(filter, sortings, pageIndex, pageSize);
            return Connection.Query<T>(sql, new { PageIndex = pageIndex, PageSize = pageSize }, commandType: CtText);
        }

        #endregion custom Methods
    }
}