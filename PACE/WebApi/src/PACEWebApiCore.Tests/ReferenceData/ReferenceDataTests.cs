using FluentAssertions;
using PACEWebApiCore.Utilities;
using ReferenceDataCore;
using System;
using System.Linq;
using Xunit;

namespace PACEWebApiCore.Api.Tests.ReferenceData
{
    public class ReferenceDataTests
    {
        private const string ConnectionString = @"Server=(localdb)\MSSQLLocalDB;Database=PACE;Trusted_Connection=True";

        [Fact]
        public void Can_Get_All_Types_From_Db()
        {
            var refService = new ReferenceService(ConnectionString);
            foreach (var rt in (ReferenceType[]) Enum.GetValues(typeof(ReferenceType)))
            {
                var typeName = Enum.GetName(typeof(ReferenceType), rt);
                var referenceItems = refService.GetAll(rt);
                if (rt == ReferenceType.None)
                {
                    referenceItems.Any().Should().BeFalse();
                    continue;
                }

                var enumerable = referenceItems as ReferenceItem[] ?? referenceItems.ToArray();
                Assert.True(referenceItems != null && enumerable.Any(), $"No results returned for type {typeName}");
                Assert.True(!enumerable.Any(r => r.Id <= 0 && r.Id != -99999),
                    $"Primary key has not been populated for type {typeName}");
            }
        }

        [Fact]
        public void Get_One_Type_Many_times()
        {
            var refService = new ReferenceService(ConnectionString);
            for (var i = 0; i < 100000; i++)
            {
                var referenceItems = refService.GetAll(ReferenceType.ActionType);
                var enumerable = referenceItems as ReferenceItem[] ?? referenceItems.ToArray();
                const string typeName = "ActionType";
                Assert.True(referenceItems != null && enumerable.Any(), $"No results returned for type {typeName}");
                Assert.True(!enumerable.Any(r => r.Id <= 0 && r.Id != -999999),
                    $"Primary key has not been populated for type {typeName}");
                Assert.True(!enumerable.Any(r => r.StartDate.Year <= 1750),
                    $"Start date has not been populated for type {typeName}");
                Assert.True(!enumerable.Any(r => r.Description.IsNullOrWhiteSpace()),
                    $"description has nor been populated for type {typeName}");
            }
        }
    }
}