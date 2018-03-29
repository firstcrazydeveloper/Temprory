SET IDENTITY_INSERT dbo.TrefActionType ON

IF NOT EXISTS (SELECT 1 FROM TrefActionType WHERE Id = 1)
BEGIN
INSERT TrefActionType (
	Id,
	DisplayOrder,
	Description,
	Code,
	StartDate,
	EndDate,
	CreatedBy,
	ModifiedBy)
VALUES (
	1,
	1,
	'Manage Teams',
	'MT',
	GETDATE(),
	NULL,
	'TrefActionType_tbl.sql', 
	'TrefActionType_tbl.sql')
END


IF NOT EXISTS (SELECT 1 FROM TrefActionType WHERE Id = 2)
BEGIN
INSERT TrefActionType (
	Id,
	DisplayOrder,
	Description,
	Code,
	StartDate,
	EndDate,
	CreatedBy,
	ModifiedBy)
VALUES (
	2,
	2,
	'Manage Users',
	'MU',
	GETDATE(),
	NULL ,
	'TrefActionType_tbl.sql', 
	'TrefActionType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefActionType WHERE Id = 3)
BEGIN
INSERT TrefActionType (
	Id,
	DisplayOrder,
	Description,
	Code,
	StartDate,
	EndDate,
	CreatedBy,
	ModifiedBy)
VALUES (
	3,
	3,
	'Manage Roles',
	'MR',
	GETDATE(),
	NULL,
	'TrefActionType_tbl.sql', 
	'TrefActionType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefActionType WHERE Id = 4)
BEGIN
INSERT TrefActionType (
	Id,
	DisplayOrder,
	Description,
	Code,
	StartDate,
	EndDate,
	CreatedBy,
	ModifiedBy)
VALUES (
	4,
	4,
	'Contract',
	'C',
	GETDATE(),
	NULL,
	'TrefActionType_tbl.sql', 
	'TrefActionType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefActionType WHERE Id = 5)
BEGIN
INSERT TrefActionType (
	Id,
	DisplayOrder,
	Description,
	Code,
	StartDate,
	EndDate,
	CreatedBy,
	ModifiedBy)
VALUES (
	5 ,
	5,
	'Contract Templates',
	'CT',
	GETDATE(), 
	NULL ,
	'TrefActionType_tbl.sql', 
	'TrefActionType_tbl.sql')
END


SET IDENTITY_INSERT dbo.TrefActionType OFF