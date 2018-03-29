using System;
using System.Data;

namespace GenericRepository
{
    public class DataConnection : IDisposable
    {
        private readonly IDbConnection _connection;

        /// <summary>
        /// 
        /// </summary>
        protected IDbConnection Connection
        {
            get
            {
                if (_connection.State != ConnectionState.Open && _connection.State != ConnectionState.Connecting)
                {
                    _connection.Open();
                }

                return _connection;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        protected DataConnection(IDbConnection connection)
        {
            _connection = connection;
        }

        /// <inheritdoc />
        /// <summary>
        /// </summary>
        public void Dispose()
        {
            if (_connection != null && _connection.State != ConnectionState.Closed)
            {
                _connection.Close();
            }
        }
    }
}