using System;
using SqlCodeGenerator;
using SqlCodeGenerator.Attributes;
using Xunit;

namespace PACEWebApiCore.Api.Tests.SqlGeneratorTests
{
    public class SqlGeneratorTests
    {
        [Fact]
        public void GetWhere_TestForNulls()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetSelect(new {Disabled = (DateTime?) null});

            Assert.Contains("WHERE [TestTable].[Disabled] IS NULL", sql);
        }

        [Fact]
        public void GetWhere_TestForValueInNullableColumn()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetSelect(new {Disabled = new DateTime(2016, 02, 04, 0, 0, 0)});

            Assert.True(sql.Contains("WHERE [TestTable].[Disabled] = @Disabled"), sql);
        }

        [Fact]
        public void GetWhere_Limit1Result()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetSelect(new {Disabled = new DateTime(2016, 02, 04, 0, 0, 0)}, 1);

            Assert.True(sql.StartsWith("SELECT TOP 1 "), sql);
        }

        [Fact]
        public void GetWhere_NoLimitResult()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetSelect(new {Disabled = new DateTime(2016, 02, 04, 0, 0, 0)});

            Assert.True(sql.StartsWith("SELECT  [TestTable].[Id]"), sql);
        }

        [Fact]
        public void GetWhere_TestIEnumerableFilter()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();
            var sql = sqlGenerator.GetSelect(new {Description = new[] {"a", "b", "c"}});

            Assert.Contains("WHERE [TestTable].[Description] IN (@Description)", sql);
        }

        [Fact]
        public void GetWhere_TestSingleFilter()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();
            var sql = sqlGenerator.GetSelect(new {Description = 123});

            Assert.Contains("WHERE [TestTable].[Description] = @Description", sql);
        }

        [Fact]
        public void GetWhere_TestComplexFilter()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();
            var sql = sqlGenerator.GetSelect(new {Description = 123, Code = "Code"});
            Assert.Contains("WHERE [TestTable].[Description] = @Description AND [TestTable].[Code] = @Code", sql);
        }

        [Fact]
        public void Select_Does_Not_Include_NonStored()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetSelect(new { });

            Assert.DoesNotContain("[TestTable].[NonStored]", sql);
        }

        [Fact]
        public void Insert_Does_Not_Include_NonStored()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetInsert();

            Assert.DoesNotContain("[TestTable].[NonStored]", sql);
        }

        [Fact]
        public void Update_Does_Not_Include_NonStored()
        {
            var sqlGenerator = new SqlGenerator<TestObject>();

            var sql = sqlGenerator.GetUpdate();

            Assert.DoesNotContain("[TestTable].[NonStored]", sql);
        }

        [StoredAs("TestTable")]
        internal class TestObject
        {
            [KeyProperty] public int Id { get; set; }
            public string Description { get; set; }
            public string Code { get; set; }
            public DateTime? Disabled { get; set; }
            [NonStored] public string NonStored { get; set; }
        }
    }
}