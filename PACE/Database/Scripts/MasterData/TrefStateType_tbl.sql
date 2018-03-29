SET IDENTITY_INSERT dbo.TrefStateType ON

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 1)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (1,1,'Australian Capital Territory','ACT',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 2)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (2,2,'New South Wales','NSW',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 3)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (3,3,'Northern Territory','NT',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 4)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (4,4,'South Australia','SA',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 5)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (5,5,' Queensland','QLD',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 6)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (6,6,' Tasmania','TAS',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 7)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (7,7,'Victoria','VIC',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStateType WHERE Id = 8)
BEGIN
INSERT TrefStateType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (8,8,'Western Australia','WA',GETDATE(),NULL,'TrefStateType_tbl.sql','TrefStateType_tbl.sql')
END


SET IDENTITY_INSERT dbo.TrefStateType OFF