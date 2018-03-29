CREATE TABLE [dbo].[UserApprover]
(
	[Id] INT IDENTITY (1, 1) NOT NULL,
    [ApproverId]  INT           NOT NULL,
	[UserId]  INT          NOT NULL, 
    [Created] DATETIME       DEFAULT (getdate()) NOT NULL,
    [CreatedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	[Modified]  DATETIME       DEFAULT (getdate()) NOT NULL,
    [ModifiedBy][varchar](128) NOT NULL DEFAULT (suser_sname()),
	CONSTRAINT [UserApprover_PK] PRIMARY KEY NONCLUSTERED (Id ASC),
	CONSTRAINT [UserApprover_User_FK] FOREIGN KEY ([ApproverId]) REFERENCES [dbo].[User] ([Id]),
	CONSTRAINT [UserApprover_User_UserId_FK] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]),

)
GO
CREATE UNIQUE CLUSTERED INDEX [UserApprover_BK]
    ON [dbo].[UserApprover]([UserId] ASC,[ApproverId] ASC) WITH (FILLFACTOR = 90);

