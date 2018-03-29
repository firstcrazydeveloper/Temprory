CREATE TABLE [dbo].[Employee] (
    [EmployeeID]   INT            IDENTITY (2, 1) NOT NULL,
    [EmployeeCode] NVARCHAR (15)  NOT NULL,
    [Surname]      NVARCHAR (50)  NOT NULL,
    [GivenName]    NVARCHAR (50)  NOT NULL,
    [JobTitle]     NVARCHAR (256) NULL,
    [OfficeID]     INT            DEFAULT ((1)) NOT NULL,
    [DepartmentID] INT            DEFAULT ((1)) NOT NULL,
    [DomainName]   [sysname]      NULL,
    [UserName]     [sysname]      NULL,
    [Email]        NVARCHAR (80)  NULL,
    [LicenseNo]    NVARCHAR (15)  NULL,
    [Mobile]       NVARCHAR (20)  NULL,
    [Telephone]    NVARCHAR (30)  NULL,
    [CountryID]    INT            DEFAULT ((1)) NOT NULL,
    [Status]       INT            DEFAULT ((0)) NOT NULL,
    [CreatedBy]    [varchar](128) DEFAULT (suser_sname()) NOT NULL,
    [Created]      DATETIME       DEFAULT (getdate()) NOT NULL,
    [Modified]     DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy]   [varchar](128) DEFAULT (suser_sname()) NOT NULL,    
    CONSTRAINT [Employee_PK] PRIMARY KEY NONCLUSTERED ([EmployeeID] ASC)
);

GO
CREATE UNIQUE CLUSTERED INDEX [Employee_BK]
    ON [dbo].[Employee]([EmployeeCode] ASC) WITH (FILLFACTOR = 90);

GO
CREATE UNIQUE NONCLUSTERED INDEX [Employee_Username_IDX]
    ON [dbo].[Employee]([DomainName] ASC, [UserName] ASC, [EmployeeID] ASC);