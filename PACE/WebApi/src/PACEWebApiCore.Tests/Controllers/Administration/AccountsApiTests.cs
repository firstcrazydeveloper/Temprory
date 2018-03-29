using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using PACEWebApiCore.Api.Controllers.Administration;
using PACEWebApiCore.Api.Helpers;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using SqlCodeGenerator;
using Xunit;

namespace PACEWebApiCore.Api.Tests.Controllers.Administration
{
    public class AccountsApiTests
    {
        [Fact]
        public void Account_Get_By_Id()
        {
            var mockrepo = SetupAccountMockRepo();

            var controller = new AccountsController(mockrepo.Object);
            var apiResponse = controller.Get(1);
            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var account = okResult.Value.Should().BeAssignableTo<Account>().Subject;

            //response expects object collection
            account.Id.Should().Be(1);
        }
        [Fact]
        public void Test_Paged_Filter()
        {
            var filter = new PageFilter
            {
                Filter = new { Id = "1,2,3,4,5,6" , Name = "Your Name"},
                Sortings = new List<SortDescriptor>
                {
                    new SortDescriptor
                    {
                        Field = "name",
                        Direction = SortDescriptor.SortingDirection.Ascending
                    }
                },
                PageSize = 5,
                PageIndex = 1
            };
            var str = JsonConvert.SerializeObject(filter);
            str.Should().NotBeNullOrEmpty();

        }
        [Fact]
        public void Accounts_Get_All()
        {
            var mockrepo = SetupAccountMockRepo();

            var controller = new AccountsController(mockrepo.Object);
            var apiResponse = controller.GetList();
            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var accounts = okResult.Value.Should().BeAssignableTo<IEnumerable<Account>>().Subject;
            //response expects object collection
            accounts.Count().Should().Be(2);
        }


        [Fact]
        public void Insert_New_Account()
        {
            var mockrepo = SetupAccountMockRepo();
            var acc = new Account
            {
                Id = 3,
                Name = "Account Three",
                Created = DateTime.UtcNow,
                CreatedBy = @"AU\\Dwayne.Apostolov",
                Modified = DateTime.UtcNow,
                ModifiedBy = @"AU\\Dwayne.Apostolov"
            };
            var controller = new AccountsController(mockrepo.Object);
            var apiResponse = controller.Post(acc);

            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var account = okResult.Value.Should().BeAssignableTo<Account>().Subject;
            account.Id.Should().Be(3);
        }

        [Fact]
        public void Update_Account_Returns_BadRequestObjectResult()
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
            var controller = new AccountsController(mockrepo.Object);
            var result = controller.Update(accountDoesNotExist);
            result.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public void Delete_Account_Should_Be_Success()
        {
            var mockrepo = new Mock<IDataRepository<Account>>();
            var controller = new AccountsController(mockrepo.Object);
            var result = controller.DeleteEntity(new {Id = 2});
            var okResult = result.Should().BeOfType<OkObjectResult>().Subject;
            okResult.Value.Should().Be("Deleted: { Id = 2 }");
        }

        private static Mock<IDataRepository<Account>> SetupAccountMockRepo()
        {
            var mockrepo = new Mock<IDataRepository<Account>>();
            var accounts = new List<Account>()
            {
                new Account
                {
                    Id = 1,
                    Name = "Account One",
                    Created = DateTime.UtcNow,
                    CreatedBy = "AU\\Zaldy.Acosta",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = "AU\\Zaldy.Acosta"
                },
                new Account
                {
                    Id = 2,
                    Name = "Account Two",
                    Created = DateTime.UtcNow,
                    CreatedBy = "AU\\Johannes.Strydom",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = "AU\\Johannes.Strydom"
                }
            };

            var sortings = new List<SortDescriptor>()
            {
                new SortDescriptor() {Field = "Name", Direction = SortDescriptor.SortingDirection.Descending}
            };

            mockrepo.Setup(a => a.GetList()).Returns(accounts.AsEnumerable());


            mockrepo.Setup(a => a.Get(It.IsAny<int>()))
                .Returns(new Func<int, Account>(id => accounts.Find(o => o.Id.Equals(id))));
            mockrepo.Setup(a => a.Insert(It.IsAny<Account>())).Callback((Account acc) => { accounts.Add(acc); })
                .Returns(() => { return accounts.First(a => a.Id == 3); });
            mockrepo.Setup(a => a.Delete(It.IsAny<object>())).Callback((object id) =>
            {
                accounts.RemoveAll(o => o.Id.Equals(id));
            });
            mockrepo.Setup(d => d.Update(It.IsAny<Account>())).Throws<NullReferenceException>();

            return mockrepo;
        }
    }
}