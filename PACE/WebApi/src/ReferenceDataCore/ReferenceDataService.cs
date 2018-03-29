using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Runtime.Caching;
using System.Transactions;

namespace ReferenceDataCore
{
    public sealed class ReferenceDataService : IDisposable
    {
        private readonly MemoryCache _referenceCache = MemoryCache.Default;

        private string _connectionString;


        // public ReferenceDataService GetInstance => new ReferenceDataService();

        public ReferenceDataService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IEnumerable<ReferenceItem> GetReferenceItems(ReferenceType type, DateTime? contextDate = null,
            int? includeReferenceItemById = null)
        {
            var cacheKey = GetCacheKey(type);
            var referenceDataCacheItem = _referenceCache.GetCacheItem(cacheKey);

            if (referenceDataCacheItem != null)
            {
                var cachedReferenceItems = referenceDataCacheItem.Value as IEnumerable<ReferenceItem>;
                return CloneReferenceItems(cachedReferenceItems, contextDate);
            }

            var isBrokerEnabled = IsServiceBrokerEnabled();
            var referenceData = GetReferenceItemsFromSource(type, isBrokerEnabled);

            var cip = new CacheItemPolicy {AbsoluteExpiration = DateTime.Now.AddHours(24)};

            _referenceCache.AddOrGetExisting(cacheKey, referenceData, cip);
            return CloneReferenceItems(referenceData, contextDate);
        }

        private IEnumerable<ReferenceItem> CloneReferenceItems(IEnumerable<ReferenceItem> items,
            DateTime? contextDate = null)
        {
            var clones = items.Select(i => new ReferenceItem(i, contextDate));
            return clones;
        }

        private IEnumerable<ReferenceItem> GetReferenceItemsFromSource(ReferenceType type, bool isBrokerEnabled = true)
        {
            var referenceItems = new List<ReferenceItem>();
            var schemaInfo = new ReferenceTypeSchemaInfo(type, _connectionString);

            using (var conn = GetConnection())
            using (var dataReader = GetDataReader(schemaInfo, conn, isBrokerEnabled))
            {
                while (dataReader.Read())
                {
                    var referenceItem = new ReferenceItem();

                    for (var o = 0; o < dataReader.FieldCount; o++)
                    {
                        PopulateOrdinalValue(dataReader, o, referenceItem, schemaInfo);
                    }

                    if (referenceItem.StartDate == DateTime.MinValue)
                    {
                        referenceItem.StartDate = DateTime.Now.AddDays(-1);
                    }

                    referenceItems.Add(referenceItem);
                }

                return referenceItems;
            }
        }

        private SqlDataReader GetDataReader(ReferenceTypeSchemaInfo schemaInfo, SqlConnection conn,
            bool isBrokerEnabled)
        {
            using (new TransactionScope(TransactionScopeOption.Suppress))
            {
                var cmd = new SqlCommand(schemaInfo.GetReferenceTableSql(), conn);

                if (isBrokerEnabled)
                {
                    var dependency = new SqlDependency(cmd);

                    dependency.OnChange += (sender, e) =>
                    {
                        var ck = GetCacheKey(schemaInfo.Type);
                        _referenceCache.Remove(ck);
                        cmd.Dispose();
                    };
                }

                if (cmd.Connection.State != ConnectionState.Open)
                {
                    cmd.Connection.Open();
                }

                try
                {
                    return cmd.ExecuteReader();
                }
                catch (InvalidOperationException opEx)
                {
                    if (!opEx.Message.Contains("SqlDependency.Start()"))
                    {
                        throw;
                    }

                    StartSqlDependencyService();
                    return cmd.ExecuteReader();
                }
            }
        }

        private void PopulateOrdinalValue(IDataRecord record, int ordinal, ReferenceItem referenceItem,
            ReferenceTypeSchemaInfo schemaInfo)
        {
            var cName = record.GetName(ordinal);

            if (cName.Equals(schemaInfo.PrimaryKeyName, StringComparison.OrdinalIgnoreCase))
            {
                referenceItem.Id = record.GetInt32(ordinal);
            }

            if (cName.Equals(schemaInfo.DescriptionColumnName, StringComparison.OrdinalIgnoreCase))
            {
                referenceItem.Description = record.IsDBNull(ordinal) ? string.Empty : record.GetString(ordinal);
            }

            if (schemaInfo.FlagColumns.Contains(cName) && !referenceItem.Flags.ContainsKey(cName))
            {
                referenceItem.Flags.Add(record.GetName(ordinal), record.GetBoolean(ordinal));
            }

            switch (record.GetName(ordinal).ToLower())
            {
                case "id":
                    referenceItem.Id = record.GetInt32(ordinal);
                    break;
                case "code":
                    referenceItem.Code = record.IsDBNull(ordinal) ? string.Empty : record[ordinal].ToString();
                    break;
                case "description":
                    referenceItem.Description = record.IsDBNull(ordinal) ? string.Empty : record.GetString(ordinal);
                    break;
                case "abbreviation":
                    referenceItem.Abbreviation = record.IsDBNull(ordinal) ? string.Empty : record.GetString(ordinal);
                    break;
                case "displayorder":
                    referenceItem.DisplayOrder = record.IsDBNull(ordinal) ? null : (int?) record.GetInt32(ordinal);
                    break;
                case "startdate":
                    referenceItem.StartDate = record.GetDateTime(ordinal);
                    break;
                case "enddate":
                    referenceItem.EndDate = record.IsDBNull(ordinal) ? null : (DateTime?) record.GetDateTime(ordinal);
                    break;
                case "isselectable":
                    referenceItem.IsSelectable = record.IsDBNull(ordinal) || record.GetBoolean(ordinal);
                    break;
                case "parent":
                    referenceItem.Parent = record.IsDBNull(ordinal) ? string.Empty : record[ordinal].ToString();
                    break;
                // Catch all for every other column that may exist.
                default:
                    var name = record.GetName(ordinal);

                    if (cName.Equals(schemaInfo.PrimaryKeyName, StringComparison.OrdinalIgnoreCase) ||
                        cName.Equals(schemaInfo.DescriptionColumnName, StringComparison.OrdinalIgnoreCase)
                        || cName.Equals("startdate", StringComparison.OrdinalIgnoreCase))
                        break;

                    var value = record.IsDBNull(ordinal) ? string.Empty : record[ordinal].ToString();

                    if (referenceItem.OtherColumns.ContainsKey(name))
                    {
                        break;
                    }

                    referenceItem.OtherColumns.Add(name, value);
                    break;
            }
        }

        private bool IsServiceBrokerEnabled()
        {
            using (new TransactionScope(TransactionScopeOption.Suppress))
            using (var conn = GetConnection())
            using (var cmd = new SqlCommand("select is_broker_enabled from sys.databases where name = @database", conn))
            {
                cmd.Parameters.AddWithValue("database", conn.Database);
                cmd.CommandType = CommandType.Text;
                conn.Open();
                var isEnabled = (bool) cmd.ExecuteScalar();
                return isEnabled;
            }
        }

        public void StartSqlDependencyService()
        {
            if (!IsServiceBrokerEnabled())
            {
                throw new Exception(
                    $"The service broker on database {GetConnection().Database} has not been started. Without the service broker, " +
                    "we will not be able to retrieve & and maintain reference data.  " +
                    "You will need to recycle the App Pools after the Broker has been enabled.");
            }

            var isStarted = false;
            var attempt = 0;
            const int maxAttempts = 100;
            while (!isStarted)
            {
                try
                {
                    SqlDependency.Start(_connectionString);
                    isStarted = true;
                }
                catch (KeyNotFoundException)
                {
                    attempt++;
                    if (attempt > maxAttempts)
                    {
                        throw;
                    }

                    Trace.WriteLine(
                        $"ReferenceData.ReferenceDataService.StartSqlDependencyService() cleaning poisoned queue, attempt: {attempt}.");
                }
            }
        }

        public void StopSqlDependencyService()
        {
            SqlDependency.Stop(_connectionString);
        }

        private static string GetCacheKey(ReferenceType type)
        {
            return $"ReferenceData_{Enum.GetName(typeof(ReferenceType), type)}";
        }

        private SqlConnection GetConnection()
        {
            if (!_connectionString.ToUpper().Contains("CONNECTION TIMEOUT"))
            {
                _connectionString = _connectionString + "; Connection Timeout = 50;";
            }

            return new SqlConnection(_connectionString);
        }

        ~ReferenceDataService()
        {
            SqlDependency.Stop(_connectionString);
        }

        public void Dispose()
        {
            SqlDependency.Stop(_connectionString);
        }
    }
}