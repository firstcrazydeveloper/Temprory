using FluentAssertions;
using GenericRepository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PACEWebApiCore.Api.Controllers.Administration;
using PACEWebApiCore.Entities.Administration;
using PACEWebApiCore.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace PACEWebApiCore.Api.Tests.Controllers.Administration
{
    public class AddressesApiTests
    {
        [Fact]
        public void Address_Get_By_Id()
        {
            var mockrepo = SetupMockRepo();

            var controller = new AddressesController(mockrepo.Object);
            var apiResponse = controller.Get(1);
            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var account = okResult.Value.Should().BeAssignableTo<Account>().Subject;

            //response expects object collection
            account.Id.Should().Be(1);
        }

        [Fact]
        public void Addresses_Get_All()
        {
            var mockrepo = SetupMockRepo();

            var controller = new AddressesController(mockrepo.Object);
            var apiResponse = controller.GetList();
            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var accounts = okResult.Value.Should().BeAssignableTo<IEnumerable<Account>>().Subject;
            //response expects object collection
            accounts.Count().Should().Be(2);
        }

        //TODO Need to fix setup
        //[Fact]
        //public void Accounts_Get_Pages()

        [Fact]
        public void Insert_New_Address()
        {
            var mockrepo = SetupMockRepo();
            var acc = new Address
            {
                Id = 3,
                StreetName = "Street Three",
                Created = DateTime.UtcNow,
                CreatedBy = @"AU\\Dwayne.Apostolov",
                Modified = DateTime.UtcNow,
                ModifiedBy = @"AU\\Dwayne.Apostolov"
            };
            var controller = new AddressesController(mockrepo.Object);
            var apiResponse = controller.Post(acc);

            var okResult = apiResponse.Should().BeOfType<OkObjectResult>().Subject;
            var account = okResult.Value.Should().BeAssignableTo<Account>().Subject;
            account.Id.Should().Be(3);
        }

        [Fact]
        public void Update_Account_Returns_BadRequestObjectResult()
        {
            var DoesNotExist = new Address
            {
                Id = 1000,
                Created = DateTime.UtcNow,
                CreatedBy = "noname",
                Modified = DateTime.UtcNow,
                ModifiedBy = "noname"
            };
            var mockrepo = SetupMockRepo();
            var controller = new AddressesController(mockrepo.Object);
            var result = controller.Update(DoesNotExist);
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

        private static Mock<IDataRepository<Address>> SetupMockRepo()
        {
            var mockrepo = new Mock<IDataRepository<Address>>();
            var addresses = new List<Address>()
            {
                new Address
                {
                    Id = 1,
                    StreetName = "Street One",
                    Created = DateTime.UtcNow,
                    CreatedBy = "AU\\Zaldy.Acosta",
                    Modified = DateTime.UtcNow,
                    ModifiedBy = "AU\\Zaldy.Acosta"
                },
                new Address
                {
                    Id = 2,
                    StreetName = "Street Two",
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

            mockrepo.Setup(a => a.GetList()).Returns(addresses.AsEnumerable());
            //TODO Fix test setup
            //mockrepo.Setup(a => a.GetPage<Account>(It.IsAny<object>(), It.IsAny<IEnumerable<SortDescriptor>>(),
            //    It.IsAny<int>(), It.IsAny<int>()))
            //    .Returns(new Func<object, IEnumerable<SortDescriptor>, int, int, IEnumerable<Account>(obj, sortings => acc));

            mockrepo.Setup(a => a.Get(It.IsAny<int>()))
                .Returns(new Func<int, Address>(id => addresses.Find(o => o.Id.Equals(id))));
            mockrepo.Setup(a => a.Insert(It.IsAny<Address>())).Callback((Address acc) => { addresses.Add(acc); })
                .Returns(() => { return addresses.First(a => a.Id == 3); });
            mockrepo.Setup(a => a.Delete(It.IsAny<object>())).Callback((object id) =>
            {
                addresses.RemoveAll(o => o.Id.Equals(id));
            });
            mockrepo.Setup(d => d.Update(It.IsAny<Address>())).Throws<NullReferenceException>();

            return mockrepo;
        }
    }
}