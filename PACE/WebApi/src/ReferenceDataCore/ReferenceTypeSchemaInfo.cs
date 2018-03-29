namespace ReferenceDataCore
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;

    /// <summary>
    /// Discovers reference data schema information and presents it in a usable form for the reference data service.
    /// </summary>
    public class ReferenceTypeSchemaInfo
    {
        private readonly string _connectionString;

        /// <summary>
        /// Gets the reference data schema.
        /// </summary>
        /// <value>
        /// The reference data schema.
        /// </value>
        public string ReferenceDataSchema { get; private set; }

        /// <summary>
        /// Gets or sets the name of the primary key.
        /// </summary>
        /// <value>
        /// The name of the primary key.
        /// </value>
        public string PrimaryKeyName { get; private set; }

        /// <summary>
        /// Gets or sets the name of the description column.
        /// </summary>
        /// <value>
        /// The name of the description column.
        /// </value>
        public string DescriptionColumnName { get; private set; }

        /// <summary>
        /// Gets or sets the columns.
        /// </summary>
        /// <value>
        /// The columns.
        /// </value>
        public List<string> Columns { get; private set; }

        /// <summary>
        /// Gets the flag columns. These are just boolean columns.
        /// </summary>
        /// <value>
        /// The flag columns.
        /// </value>
        public List<string> FlagColumns { get; private set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>
        /// The type.
        /// </value>
        public ReferenceType Type { get; set; }

        /// <summary>
        /// Gets the name of the type.
        /// </summary>
        /// <value>
        /// The name of the type.
        /// </value>
        public string TypeName => Enum.GetName(typeof(ReferenceType), Type);


        /// <summary>
        /// Prevents a default instance of the <see cref="ReferenceTypeSchemaInfo"/> class from being created.
        /// </summary>
        /// <summary>
        /// Initializes a new instance of the <see cref="ReferenceTypeSchemaInfo"/> class.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="connectionString"></param>
        public ReferenceTypeSchemaInfo(ReferenceType type, string connectionString)
        {
            _connectionString = connectionString;
            Type = type;
            Initialise();
        }

        /// <summary>
        /// Gets the SQL.
        /// </summary>
        /// <returns></returns>
        public string GetReferenceTableSql() => $"select {GetColumnCsv()} from {ReferenceDataSchema}.tref{TypeName}";

        /// <summary>
        /// Gets the column CSV.
        /// </summary>
        /// <returns></returns>
        public string GetColumnCsv() => string.Join(",", Columns);


        private void Initialise()
        {
            // limitation here, we don't expect to find two ref tables of the same name in two different schemas.
            var sql = string.Format(@"
declare @schema as varchar(10);
select	@schema = TABLE_SCHEMA
from	information_schema.tables t
where	Table_Name like 'tref{0}' and TABLE_SCHEMA like 'dbo'
select	@schema
select	k.column_name as PrimaryKeyColumnName
from	information_schema.tables t
            join information_schema.key_column_usage k on k.table_name = t.table_name
                and k.table_schema = t.table_schema
                and t.table_schema like @schema
                and t.table_name like 'tref{0}'
            join information_schema.table_constraints tc on tc.constraint_name = k.constraint_name
                and tc.constraint_schema = k.table_schema
                and tc.constraint_type like 'Primary key'
select	top (1) c.column_name as DescriptionColumnName
from	information_schema.tables t
            join information_schema.columns c on c.table_name = t.table_name			
                and c.table_schema = t.table_schema
                and t.table_schema like @schema 
                and t.table_name like 'tref{0}' 
                and c.data_type like 'varchar' 
                and (c.character_maximum_length > 10 or c.column_name like '%desc%')
select	c.column_name
from	information_schema.tables t
            join information_schema.columns c on c.table_name = t.table_name
                and c.table_schema = t.table_schema	
                and t.table_schema like @schema 
                and t.table_name like 'tref{0}'
                and c.column_name not like 'TimeStamp'
                and c.column_name not like 'Created'
				and c.column_name not like 'CreatedBy'
				and c.column_name not like 'Modified'
				and c.column_name not like 'ModifiedBy'
                -- exclude varchar(max) et al. We don't want to return and cache massive columns.
                and isnull(c.character_maximum_length, 0) != -1
select	c.column_name
from	information_schema.tables t
            join information_schema.columns c on c.table_name = t.table_name
                and c.table_schema = t.table_schema
                and t.table_schema like @schema
                and t.table_name like 'tref{0}'
                and c.data_type like 'bit'
                and c.is_nullable like 'no'
", TypeName);

            // We don't want reference data retrieval to participate in transactions.
            using (var conn = new SqlConnection(_connectionString))
            using (var cmd = new SqlCommand(sql, conn))
            {
                cmd.CommandText = sql;
                conn.Open();
                var r = cmd.ExecuteReader();

                r.Read();
                ReferenceDataSchema = r[0].ToString();
                r.NextResult();

                r.Read();
                PrimaryKeyName = r[0].ToString();
                r.NextResult();

                DescriptionColumnName = string.Empty;
                if (r.Read())
                {
                    DescriptionColumnName = r[0].ToString();
                }

                r.NextResult();
                Columns = new List<string>();

                while (r.Read())
                {
                    Columns.Add(r[0].ToString());
                }

                if (!r.NextResult())
                {
                    return;
                }

                FlagColumns = new List<string>();

                while (r.Read())
                {
                    FlagColumns.Add(r[0].ToString());
                }
            }
        }
    }
}