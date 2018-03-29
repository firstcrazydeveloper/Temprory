using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace ReferenceDataCore
{
    public interface IReferenceDataService
    {
        IEnumerable<ReferenceItem> GetReferenceItems(ReferenceType type, DateTime? contextDate = null,
            int? includeReferenceItemById = null);

        IEnumerable<ReferenceItem> GetReferenceItemsFromSource(ReferenceType type, bool isBrokerEnabled);
        SqlDataReader GetDataReader(ReferenceTypeSchemaInfo schemaInfo, SqlConnection conn, bool isBrokerEnabled);
        bool IsServiceBrokerEnabled();
        void StartSqlDependencyService();
        void StopSqlDependencyService();
        SqlConnection GetConnection();
        void Dispose();
    }
}