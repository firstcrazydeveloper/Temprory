CREATE TABLE [dbo].[User]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
	[PeopleSoftId]  INT         NOT NULL,
    [Domain] NVARCHAR (128)  NOT NULL,
	[UserName] NVARCHAR (128)  NOT NULL,
	[EmployeeId]  INT             NOT NULL,
	[Position] NVARCHAR (250)  NULL,
	[BusinessLineId]  INT          NOT NULL,
	[StatusId]  INT           NOT NULL,
    [IsDeleted] BIT DEFAULT(0) NOT NULL,
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy] [varchar](128) DEFAULT (suser_sname()) NOT NULL,
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy] [varchar](128) DEFAULT (suser_sname()) NOT NULL,
	[Password] VARCHAR(50) NULL, 
    CONSTRAINT [User_PK] PRIMARY KEY NONCLUSTERED (Id ASC),

)
GO
CREATE UNIQUE CLUSTERED INDEX [User_BK]
    ON [dbo].[User]([UserName] ASC) WITH (FILLFACTOR = 90);
