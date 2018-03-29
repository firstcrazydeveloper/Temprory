using AutoFixture;
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
using System.Text;
using Xunit;

namespace PACEWebApiCore.Api.Tests.Controllers.Administration
{
    /// <summary>
    /// This class contains tests for api calls for RoleController
    /// </summary>
    public class RolesApiTests
    {
        #region Variable declarations & Initialiation
        private Fixture _fixture;
        #endregion

        #region Constructor Call
        public RolesApiTests()
        {
            _fixture = new Fixture();
        }
        #endregion

        #region Private Methods 

        private static Mock<IDataRepository<Role>> SetupMockRepo()
        {
            var mockrepo = new Mock<IDataRepository<Role>>();
            var roles = new List<Role>()
            {
               new Role()
               {
                   Id=1,
                   Name = "Test Role 1",
                   Created=DateTime.Now,
                   CreatedBy="in/gagande.pratihar",
                   Modified= DateTime.Now,
                   ModifiedBy="in/gagande.pratihar",
                   IsDeleted = true,
                   IsSuperAdmin = false,
                   TotalCount = 12
               },
               new Role()
               {
                   Id=2,
                   Name = "Test Role 2",
                   Created=DateTime.Now,
                   CreatedBy="in/gagande.pratihar",
                   Modified= DateTime.Now,
                   ModifiedBy="in/gagande.pratihar",
                   IsDeleted = true,
                   IsSuperAdmin = false,
                   TotalCount = 12
               },
               new Role()
               {
                   Id=3,
                   Name = "Test Role 3",
                   Created=DateTime.Now,
                   CreatedBy="in/gagande.pratihar",
                   Modified= DateTime.Now,
                   ModifiedBy="in/gagande.pratihar",
                   IsDeleted = true,
                   IsSuperAdmin = false,
                   TotalCount = 12
               },
               new Role()
               {
                   Id=4,
                   Name = "Test Role 4",
                   Created=DateTime.Now,
                   CreatedBy="in/gagande.pratihar",
                   Modified= DateTime.Now,
                   ModifiedBy="in/gagande.pratihar",
                   IsDeleted = true,
                   IsSuperAdmin = false,
                   TotalCount = 12
               }
            };

            var sortings = new List<SortDescriptor>()
            {
                new SortDescriptor() {Field = "Name", Direction = SortDescriptor.SortingDirection.Descending}
            };

            mockrepo.Setup(a => a.GetList()).Returns(roles.AsEnumerable());
            mockrepo.Setup(a => a.Get(It.IsAny<int>()))
                .Returns(new Func<int, Role>(id => roles.Find(o => o.Id.Equals(id))));
            mockrepo.Setup(a => a.Insert(It.IsAny<Role>())).Callback((Role acc) => { roles.Add(acc); })
                .Returns(() => { return roles.First(a => a.Id == 3); });
            mockrepo.Setup(a => a.Delete(It.IsAny<object>())).Callback((object id) =>
            {
                roles.RemoveAll(o => o.Id.Equals(id));
            });
            mockrepo.Setup(d => d.Update(It.IsAny<Role>())).Throws<NullReferenceException>();

            return mockrepo;
        }

        #endregion

        #region Test Methods

        /// <summary>
        /// This test method tests get role by id call
        /// /api/roles/3
        /// </summary>
        [Theory]
        [InlineData(34)]
        public void Role_Get_By_Id_Returns_NoObjectFound(int id)
        {
            //Arrange
            var mockRepository = SetupMockRepo();
            var controller = new RolesController(mockRepository.Object);
            //Act
            var result = controller.Get(id);
            //Assert
            var objectResult = result.Should().BeOfType<NotFoundObjectResult>().Subject;
            
            Assert.Equal(404,objectResult.StatusCode);
        }

        /// <summary>
        /// This test method tests get role by id call
        /// /api/roles/3
        /// </summary>
        [Theory]
        [InlineData(4)]
        public void Role_Get_By_Id_Returns_RoleObject(int id)
        {
            //Arrange
            var mockRepository = SetupMockRepo();
            var controller = new RolesController(mockRepository.Object);
            //Act
            var result = controller.Get(id);
            //Assert
            var objectResult = result.Should().BeOfType<OkObjectResult>().Subject;

            Assert.Equal(200, objectResult.StatusCode);
        }


        /// <summary>
        /// This test method tests get role by id call
        /// /api/roles/3
        /// </summary>
        [Theory]
        [InlineData(9)]
        public void Role_Get_By_Id_Throws_Exception(int id)
        {
            //Arrange
            var mockRepository = SetupMockRepo();
            var controller = new RolesController(mockRepository.Object);
            //Act
            var result = Assert.Throws<Exception>(()=> controller.Get(id));
            //Assert
            var objectResult = result.Should().BeOfType<BadRequestObjectResult>().Subject;
            Assert.Equal(400, objectResult.StatusCode);
        }

        /// <summary>
        /// This test method test get all roles call
        /// /api/roles/list
        /// </summary>

        [Fact]
        public void Role_Get_All()
        {
            //Arrange
            var mockRepository = SetupMockRepo();
            var controller = new RolesController(mockRepository.Object);
            //Act
            var result = controller.GetList();
            //Assert
            var objectResult = result.Should().BeOfType<OkObjectResult>().Subject;
            Assert.Equal(200, objectResult.StatusCode);

        }


        #endregion

    }
}
