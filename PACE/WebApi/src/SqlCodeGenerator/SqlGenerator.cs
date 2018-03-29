using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using PACEWebApiCore.Utilities;
using SqlCodeGenerator.Attributes;

namespace SqlCodeGenerator
{
    public class SqlGenerator<T> : ISqlGenerator<T> where T : new()
    {
        /// <summary>
        /// 
        /// </summary>
        public SqlGenerator()
        {
            LoadEntityMetadata();
        }

        private void LoadEntityMetadata()
        {
            var entityType = typeof(T);

            var aliasAttribute = entityType.GetCustomAttribute<StoredAsAttribute>();
            var schemeAttribute = entityType.GetCustomAttribute<SchemeAttribute>();
            TableName = aliasAttribute != null ? aliasAttribute.Value : entityType.Name;
            Scheme = schemeAttribute != null ? schemeAttribute.Value : "dbo";

            //Load all the "primitive" entity properties
            var props = entityType.GetProperties()
                .Where(p => p.PropertyType.IsValueType
                            || p.PropertyType.Name.Equals("String", StringComparison.InvariantCultureIgnoreCase)
                            || p.PropertyType.Name.Equals("Byte[]", StringComparison.InvariantCultureIgnoreCase));

            //Filter the non stored properties
            var propertyInfos = props as IList<PropertyInfo> ?? props.ToList();
            BaseProperties = propertyInfos.Where(p => !p.GetCustomAttributes<NonStoredAttribute>().Any())
                .Select(p => new PropertyMetadata(p)).ToList();

            //Filter key properties
            KeyProperties = propertyInfos.Where(p => p.GetCustomAttributes<KeyPropertyAttribute>().Any())
                .Select(p => new PropertyMetadata(p)).ToList();

            //Use identity as key pattern
            var identityProperty =
                propertyInfos.SingleOrDefault(p => p.GetCustomAttributes<KeyPropertyAttribute>().Any(k => k.Identity));
            IdentityProperty = identityProperty != null ? new PropertyMetadata(identityProperty) : null;

            //Status property (if exists, and if it does, it must be an enumeration)
            var statusProperty = propertyInfos.FirstOrDefault(p =>
                p.PropertyType.IsEnum && p.GetCustomAttributes<StatusPropertyAttribute>().Any());

            if (statusProperty == null)
            {
                return;
            }

            StatusProperty = new PropertyMetadata(statusProperty);
            var statusPropertyType = statusProperty.PropertyType;
            var deleteOption = statusPropertyType.GetFields()
                .FirstOrDefault(f => f.GetCustomAttribute<DeletedAttribute>() != null);

            if (deleteOption == null)
            {
                return;
            }

            var enumValue = Enum.Parse(statusPropertyType, deleteOption.Name);

            if (enumValue != null)
            {
                LogicalDeleteValue = Convert.ChangeType(enumValue, Enum.GetUnderlyingType(statusPropertyType));
            }
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public bool IsIdentity => IdentityProperty != null;

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public bool LogicalDelete => StatusProperty != null;

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public string TableName { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public string Scheme { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public PropertyMetadata IdentityProperty { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public IEnumerable<PropertyMetadata> KeyProperties { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public IEnumerable<PropertyMetadata> BaseProperties { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public PropertyMetadata StatusProperty { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public object LogicalDeleteValue { get; private set; }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string GetInsert()
        {
            //Enumerate the entity properties
            //Identity property (if exists) has to be ignored
            var properties = (IsIdentity
                ? BaseProperties.Where(p =>
                    !p.Name.Equals(IdentityProperty.Name, StringComparison.InvariantCultureIgnoreCase))
                : BaseProperties).ToList();

            var columNames = string.Join(", ", properties.Select(p => $"[{TableName}].[{p.ColumnName}]"));
            var values = string.Join(", ", properties.Select(p => $"@{p.Name}"));
            if (!columNames.Any() || !values.Any())
            {
                throw new ArgumentNullException(nameof(columNames));
            }

            var builder = new SqlBuilder();
            var insert =
                builder.AddTemplate(
                    $"INSERT INTO [{Scheme}].[{TableName}] /**columns**/ /**values**/ /**scopeidentity**/");
            builder.Columns(columNames);
            builder.Values(values);

            //If the entity has an identity key, we create a new variable into the query in order to retrieve the generated id
            if (IsIdentity)
            {
                builder.ScopeIdentity(
                    "\nDECLARE @NEWID NUMERIC(38, 0) \nSET @NEWID = SCOPE_IDENTITY() \nSELECT @NEWID");
            }

            return insert.RawSql;
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string GetUpdate()
        {
            var properties = BaseProperties.Where(p =>
                !KeyProperties.Any(k => k.Name.Equals(p.Name, StringComparison.InvariantCultureIgnoreCase)));
            var setProperties = properties.Select(p => $"[{TableName}].[{p.ColumnName}] = @{p.Name}");
            var builder = new SqlBuilder();
            var update = builder.AddTemplate($"UPDATE [{Scheme}].[{TableName}] /**set**/ /**where**/");
            foreach (var setProperty in setProperties)
            {
                builder.Set(setProperty);
            }

            foreach (var keyProperty in KeyProperties)
            {
                builder.Where($"[{TableName}].[{keyProperty.ColumnName}] = @{keyProperty.Name}");
            }

            return update.RawSql;
        }

        public virtual string GetSearch(string columnName, string searchTerm)
        {
            //Projection function
            string ProjectionFunction(PropertyMetadata p) =>
                !string.IsNullOrEmpty(p.Alias)
                    ? $"[{TableName}].[{p.ColumnName}] AS [{p.Name}]"
                    : $"[{TableName}].[{p.ColumnName}]";

            var builder = new SqlBuilder();
            var selector =
                builder.AddTemplate(
                    $"SELECT /**select**/ FROM [{Scheme}].[{TableName}] WITH (NOLOCK) /**like**/ ");
            var properties = string.Join(", ", BaseProperties.Select(ProjectionFunction));

            builder.Select(properties);
            builder.Like($" [{TableName}].[{columnName}] LIKE '{searchTerm}%'");

            return selector.RawSql;
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string GetSelectAll()
        {
            return GetSelect(new { });
        }

        public virtual string GetSelectPage(object filters, IEnumerable<SortDescriptor> sortings, int pageIndex,
            int pageSize)
        {
            //Projection function
            string ProjectionFunction(PropertyMetadata p) =>
                !string.IsNullOrEmpty(p.Alias)
                    ? $"[{TableName}].[{p.ColumnName}] AS [{p.Name}]"
                    : $"[{TableName}].[{p.ColumnName}]";

            const string selectQuery = @" ;WITH _data AS (SELECT /**select**/
                                            /**from**/
                                            /**where**/ ),
                                            _count AS (SELECT COUNT(1) AS TotalCount FROM _data
                                        )
                                        SELECT * FROM _data CROSS APPLY _count /**orderby**/ OFFSET (@PageIndex - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY";
            var builder = new SqlBuilder();

            var selector = builder.AddTemplate(selectQuery, new {PageIndex = pageIndex, PageSize = pageSize});
            var properties = string.Join(", ", BaseProperties.Select(ProjectionFunction));

            builder.Select(properties);
            builder.From($"[{Scheme}].[{TableName}]");

            var filterProperties = filters?.GetType().GetProperties().Select(p => p.Name);
            if (filterProperties != null)
            {
                var enumerable = filterProperties as IList<string> ?? filterProperties.ToList();
                var containsFilter = enumerable.Any();

                if (containsFilter)
                {
                    ToWhere(ref builder, enumerable, filters);
                }
            }

            if (LogicalDelete)
            {
                builder.Where($"[{TableName}].[{StatusProperty.Name}] != {LogicalDeleteValue}");
            }

            var sortDescriptors = sortings as IList<SortDescriptor> ?? sortings.ToList();
            foreach (var sort in sortDescriptors)
            {
                if (string.IsNullOrWhiteSpace(sort.Field))
                {
                    continue;
                }

                if (sort.Direction == SortDescriptor.SortingDirection.Ascending)
                {
                    builder.OrderBy(sort.Field);
                }
                else
                {
                    builder.OrderBy(sort.Field + " desc");
                }
            }

            if (!sortDescriptors.Any())
            {
                builder.OrderBy(IdentityProperty.ColumnName);
            }

            return selector.RawSql;
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <param name="filters"></param>
        /// <param name="rowCount">Maximum number of rows to return</param>
        /// <returns></returns>
        public virtual string GetSelect(object filters, int? rowCount = null)
        {
            //Projection function
            string ProjectionFunction(PropertyMetadata p) =>
                !string.IsNullOrEmpty(p.Alias)
                    ? $"[{TableName}].[{p.ColumnName}] AS [{p.Name}]"
                    : $"[{TableName}].[{p.ColumnName}]";

            var rowLimitSql = string.Empty;

            var builder = new SqlBuilder();
            var selector =
                builder.AddTemplate(
                    $"SELECT /**select**/ FROM [{Scheme}].[{TableName}] WITH (NOLOCK) /**where**/ /**orderby**/");

            if (rowCount.HasValue)
            {
                rowLimitSql = string.Format("TOP {0} ", rowCount);
            }

            var properties = string.Join(", ", BaseProperties.Select(ProjectionFunction));

            builder.Select($"{rowLimitSql} {properties}");

            //Properties of the dynamic filters object
            var filterProperties = filters?.GetType().GetProperties().Select(p => p.Name);
            if (filterProperties != null)
            {
                var enumerable = filterProperties as IList<string> ?? filterProperties.ToList();
                var containsFilter = enumerable.Any();

                if (containsFilter)
                {
                    ToWhere(ref builder, enumerable, filters);
                }
            }

            //Evaluates if this repository implements logical delete
            if (!LogicalDelete)
            {
                return selector.RawSql;
            }

            builder.Where($"[{TableName}].[{StatusProperty.Name}] != {LogicalDeleteValue}");
            return selector.RawSql;
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        /// <returns></returns>
        public virtual string GetDelete()
        {
            var builder = new SqlBuilder();

            if (!LogicalDelete)
            {
                var delete = builder.AddTemplate($"DELETE FROM [{Scheme}].[{TableName} /**where**/");
                foreach (var keyProperty in KeyProperties)
                {
                    builder.Where($"[{TableName}].[{keyProperty.ColumnName}] = @{keyProperty.Name}");
                }

                return delete.RawSql;
            }

            var update = builder.AddTemplate($"UPDATE [{Scheme}].[{TableName}] /**set**/ /**where**/");
            foreach (var keyProperty in KeyProperties)
            {
                builder.Set($"[{TableName}].[{keyProperty.ColumnName}] = @{keyProperty.Name}");
            }

            return update.RawSql;
        }

        public virtual void ToWhere(ref SqlBuilder builder, IEnumerable<string> properties, object filters)
        {
            var wheres = properties.Select(p =>
            {
                var propertyMetadata =
                    BaseProperties.FirstOrDefault(pm => pm.Name.Equals(p, StringComparison.InvariantCultureIgnoreCase));

                var columnName = p;
                var propertyName = p;

                if (propertyMetadata != null)
                {
                    columnName = propertyMetadata.ColumnName;
                    propertyName = propertyMetadata.Name;
                }

                var prop = filters?.GetType().GetProperty(propertyMetadata?.Name,
                    BindingFlags.Public | BindingFlags.Instance | BindingFlags.IgnoreCase);
                var values = prop?.GetValue(filters, null);

                switch (values)
                {
                    case null:
                        return $"[{TableName}].[{columnName}] IS NULL";
                    case IEnumerable _ when !(values is string):
                        return $"[{TableName}].[{columnName}] IN (@{propertyName})";
                }

                return $"[{TableName}].[{columnName}] = @{propertyName}";
            });
            foreach (var where in wheres)
            {
                builder.Where(where);
            }
        }
    }
}