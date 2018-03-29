using System.Collections.Generic;
using PACEWebApiCore.Utilities;

namespace SqlCodeGenerator
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface ISqlGenerator<T> where T : new()
    {
        /// <summary>
        /// 
        /// </summary>
        bool IsIdentity { get; }

        /// <summary>
        /// 
        /// </summary>
        PropertyMetadata IdentityProperty { get; }

        /// <summary>
        /// 
        /// </summary>
        string TableName { get; }

        /// <summary>
        /// 
        /// </summary>
        string Scheme { get; }

        /// <summary>
        /// 
        /// </summary>
        IEnumerable<PropertyMetadata> KeyProperties { get; }

        /// <summary>
        /// 
        /// </summary>
        IEnumerable<PropertyMetadata> BaseProperties { get; }

        /// <summary>
        /// 
        /// </summary>
        PropertyMetadata StatusProperty { get; }

        /// <summary>
        /// 
        /// </summary>
        object LogicalDeleteValue { get; }

        /// <summary>
        /// 
        /// </summary>
        bool LogicalDelete { get; }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        string GetSelectAll();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="rowCount"></param>
        /// <returns></returns>
        string GetSelect(object filters, int? rowCount = null);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="propertyName"></param>
        /// <param name="searchTerm"></param>
        /// <returns></returns>
        string GetSearch(string propertyName, string searchTerm);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="sortings"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        string GetSelectPage(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex, int pageSize);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        string GetInsert();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        string GetUpdate();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        string GetDelete();
    }
}