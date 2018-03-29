using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Dapper;

namespace SqlCodeGenerator
{
    /// <summary>
    /// 
    /// </summary>
    public class SqlBuilder
    {
        private readonly Dictionary<string, Clauses> _data = new Dictionary<string, Clauses>();
        private int _sequence;

        private class Clause
        {
            public string Sql { get; set; }
            public object Parameters { get; set; }
            public bool IsInclusive { get; set; }
        }

        private class Clauses : List<Clause>
        {
            private readonly string _joiner, _prefix, _postfix;

            public Clauses(string joiner, string prefix = "", string postfix = "")
            {
                _joiner = joiner;
                _prefix = prefix;
                _postfix = postfix;
            }

            public string ResolveClauses(DynamicParameters dynamicParams)
            {
                foreach (var item in this)
                {
                    dynamicParams.AddDynamicParams(item.Parameters);
                }

                return this.Any(a => a.IsInclusive)
                    ? _prefix + string.Join(_joiner,
                          this.Where(a => !a.IsInclusive)
                              .Select(c => c.Sql)
                              .Union(new[]
                              {
                                  " ( " + string.Join(" OR ",
                                      this.Where(a => a.IsInclusive).Select(c => c.Sql).ToArray()) + " ) "
                              }).ToArray()) + _postfix
                    : _prefix + string.Join(_joiner, this.Select(c => c.Sql).ToArray()) + _postfix;
            }
        }

        public class Template
        {
            private readonly string _sql;
            private readonly SqlBuilder _builder;
            private readonly object _initParams;
            private int _dataSeq = -1;

            public Template(SqlBuilder builder, string sql, dynamic parameters)
            {
                _initParams = parameters;
                _sql = sql;
                _builder = builder;
            }

            private static readonly Regex Regex = new Regex(@"\/\*\*.+?\*\*\/",
                RegexOptions.Compiled | RegexOptions.Multiline);

            private void ResolveSql()
            {
                if (_dataSeq == _builder._sequence)
                {
                    return;
                }

                var p = new DynamicParameters(_initParams);
                _rawSql = _sql;
                foreach (var pair in _builder._data)
                {
                    _rawSql = _rawSql.Replace("/**" + pair.Key + "**/", pair.Value.ResolveClauses(p));
                }

                _parameters = p;
                // replace all that is left with empty
                _rawSql = Regex.Replace(_rawSql, "");

                _dataSeq = _builder._sequence;
            }

            private string _rawSql;
            private object _parameters;

            public string RawSql
            {
                get
                {
                    ResolveSql();
                    return _rawSql;
                }
            }

            public object Parameters
            {
                get
                {
                    ResolveSql();
                    return _parameters;
                }
            }
        }

        public Template AddTemplate(string sql, dynamic parameters = null) =>
            new Template(this, sql, parameters);

        protected SqlBuilder AddClause(ClauseModel model)
        {
            if (!_data.TryGetValue(model.Name, out Clauses clauses))
            {
                clauses = new Clauses(model.Joiner, model.Prefix, model.Postfix);
                _data[model.Name] = clauses;
            }

            clauses.Add(new Clause {Sql = model.Sql, Parameters = model.Parameters, IsInclusive = model.IsInclusive});
            _sequence++;
            return this;
        }

        public SqlBuilder Intersect(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "intersect",
                Sql = sql,
                Parameters = parameters,
                Joiner = "\nINTERSECT\n ",
                Prefix = "\n ",
                Postfix = "\n"
            });

        public SqlBuilder InnerJoin(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "innerjoin",
                Sql = sql,
                Parameters = parameters,
                Joiner = "\nINNER JOIN ",
                Prefix = "\nINNER JOIN ",
                Postfix = "\n"
            });

        public SqlBuilder LeftJoin(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "leftjoin",
                Sql = sql,
                Parameters = parameters,
                Joiner = "\nLEFT JOIN ",
                Prefix = "\nLEFT JOIN ",
                Postfix = "\n"
            });

        public SqlBuilder RightJoin(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "rightjoin",
                Sql = sql,
                Parameters = parameters,
                Joiner = "\nRIGHT JOIN ",
                Prefix = "\nRIGHT JOIN ",
                Postfix = "\n"
            });

        public SqlBuilder Where(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "where",
                Sql = sql,
                Parameters = parameters,
                Joiner = " AND ",
                Prefix = "WHERE ",
                Postfix = "\n"
            });

        public SqlBuilder OrWhere(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "where",
                Sql = sql,
                Parameters = parameters,
                Joiner = " OR ",
                Prefix = "WHERE ",
                Postfix = "\n"
            });

        public SqlBuilder Like(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "like",
                Sql = sql,
                Parameters = parameters,
                Joiner = " LIKE ",
                Prefix = "WHERE",
                Postfix = "\n"
            });

        public SqlBuilder OrderBy(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "orderby",
                Sql = sql,
                Parameters = parameters,
                Joiner = " , ",
                Prefix = "ORDER BY ",
                Postfix = "\n"
            });

        public SqlBuilder Select(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "select",
                Sql = sql,
                Parameters = parameters,
                Joiner = " , ",
                Prefix = string.Empty,
                Postfix = "\n"
            });

        public SqlBuilder AddParameters(dynamic parameters) =>
            AddClause(new ClauseModel
            {
                Name = "--parameters",
                Sql = string.Empty,
                Parameters = parameters,
                Joiner = string.Empty
            });

        public SqlBuilder GroupBy(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "groupby",
                Sql = sql,
                Parameters = parameters,
                Joiner = " , ",
                Prefix = "\nGROUP BY ",
                Postfix = "\n"
            });

        public SqlBuilder Having(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "having",
                Sql = sql,
                Parameters = parameters,
                Joiner = "\nAND ",
                Prefix = "HAVING ",
                Postfix = "\n"
            });

        public SqlBuilder Set(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "set",
                Sql = sql,
                Parameters = parameters,
                Joiner = " , ",
                Prefix = "SET ",
                Postfix = "\n"
            });

        public SqlBuilder From(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "from",
                Sql = sql,
                Parameters = parameters,
                Joiner = string.Empty,
                Prefix = " FROM ",
                Postfix = "\n"
            });

        public SqlBuilder Columns(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "columns",
                Sql = sql,
                Parameters = parameters,
                Joiner = ", ",
                Prefix = " (",
                Postfix = ")\n"
            });

        public SqlBuilder Values(string sql, dynamic parameters = null) =>
            AddClause(new ClauseModel
            {
                Name = "values",
                Sql = sql,
                Parameters = parameters,
                Joiner = ", ",
                Prefix = " VALUES (",
                Postfix = ") \n"
            });

        public SqlBuilder ScopeIdentity(string sql) =>
            AddClause(new ClauseModel {Name = "scopeidentity", Sql = sql, Joiner = null, Parameters = string.Empty});
    }
}