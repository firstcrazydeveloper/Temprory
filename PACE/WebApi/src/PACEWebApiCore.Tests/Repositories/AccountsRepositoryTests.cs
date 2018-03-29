using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using GenericRepository.Interfaces;
using Moq;
using PACEWebApiCore.Entities.Administration;
using Xunit;

namespace PACEWebApiCore.Api.Tests.Repositories
{
    public class AccountsRepositoryTests
    {
        [Fact]
        public void Get_Accounts_From_Repository()
        {
            var mockRepo = SetupAccountMockRepo();
            var accounts = mockRepo.Object.GetList();
            accounts.Count().Should().Be(2);
        }

        [Fact]
        public void Get_Account_By_Id_Returns_Account()
        {
            var mockRepo = SetupAccountMockRepo();
            var account = mockRepo.Object.Get(1);
            account.Id.Should().Be(1);
        }

        [Fact]
        public void Insert_New_Account()
        {
            var mockrepo = SetupAccountMockRepo();
            var isInserted = mockrepo.Object.Insert(new Account
                {
                    Id = 3,
                    Created = DateTime.UtcNow,
                    CreatedBy = @"AU\\Dwayne.Apostolov",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = @"AU\\Dwayne.Apostolov"
                }
            );

            isInserted.Id.Should().Be(3);
        }

        [Fact]
        public void Update_Account_Expect_NullRefernceException()
        {
            var accountDoesNotExist = new Account
            {
                Id = 1000,
                Created = DateTime.UtcNow,
                CreatedBy = "noname",
                Modified = DateTime.UtcNow,
                ModifiedBy = "noname"
            };
            var mockrepo = SetupAccountMockRepo();
            Assert.Throws<NullReferenceException>(() => mockrepo.Object.Update(accountDoesNotExist));
        }

        private static Mock<IDataRepository<Account>> SetupAccountMockRepo()
        {
            var mockrepo = new Mock<IDataRepository<Account>>();

            var accounts = new List<Account>()
            {
                new Account
                {
                    Id = 1,
                    Created = DateTime.UtcNow,
                    CreatedBy = @"AU\\Zaldy.Acosta",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = @"AU\\Zaldy.Acosta"
                },
                new Account
                {
                    Id = 2,
                    Created = DateTime.UtcNow,
                    CreatedBy = @"AU\Johannes.Strydom",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = @"AU\Johannes.Strydom"
                }
            };
            mockrepo.Setup(x => x.GetList()).Returns(() => accounts);

            mockrepo.Setup(a => a.Get(It.IsAny<int>()))
                .Returns(new Func<int, Account>(id => accounts.Find(p => p.Id.Equals(id))));
            mockrepo.Setup(a => a.Insert(It.IsAny<Account>())).Callback((Account acc) => { accounts.Add(acc); })
                .Returns(() => { return accounts.First(a => a.Id >= 3); });
            mockrepo.Setup(a => a.Delete(It.IsAny<object>())).Callback((object id) =>
            {
                accounts.RemoveAll(o => o.Id.Equals(id));
            });
            mockrepo.Setup(d => d.Update(It.IsAny<Account>())).Throws<NullReferenceException>();

            //  mockrepo.Setup()
            return mockrepo;
        }
    }
}