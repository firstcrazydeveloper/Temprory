CREATE TABLE [dbo].[UserPersonalDetails]
(
	[Id]   INT            IDENTITY (1, 1) NOT NULL,
    [UserId] INT NOT NULL,
    [FirstName]      NVARCHAR (50)  NOT NULL,
    [LastName]    NVARCHAR (50)  NOT NULL,
    [Prefix]     NVARCHAR (20) NULL,    
    [Email]        NVARCHAR (80)  NULL,   
    [Mobile]       NVARCHAR (20)  NULL,    
    [IsDeleted]       BIT            DEFAULT ((0)) NOT NULL,
    [CreatedBy]    [varchar](128) DEFAULT (suser_sname()) NOT NULL,
    [Created]      DATETIME       DEFAULT (getdate()) NOT NULL,
    [Modified]     DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy]  [varchar](128) DEFAULT (suser_sname()) NOT NULL,    
    CONSTRAINT [UserPersonalDetails_PK] PRIMARY KEY NONCLUSTERED ([Id] ASC),
	CONSTRAINT [UserPersonalDetails_User_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),
	)
	GO
	CREATE UNIQUE CLUSTERED INDEX [UserPersonalDetails_BK]
    ON [dbo].[UserPersonalDetails]([UserId] ASC) WITH (FILLFACTOR = 90);
