SET IDENTITY_INSERT dbo.TrefStreetType ON

IF NOT EXISTS (SELECT 1 FROM TrefStreetType WHERE Id = 1)
BEGIN
INSERT TrefStreetType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (1,1,'Street','STR',GETDATE(),NULL,'TrefStreetType_tbl.sql','TrefStreetType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStreetType WHERE Id = 2)
BEGIN
INSERT TrefStreetType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (2,2,'Avenue','AV',GETDATE(),NULL,'TrefStreetType_tbl.sql','TrefStreetType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStreetType WHERE Id = 3)
BEGIN
INSERT TrefStreetType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (3,3,'Road','RD',GETDATE(),NULL,'TrefStreetType_tbl.sql','TrefStreetType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStreetType WHERE Id = 4)
BEGIN
INSERT TrefStreetType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (4,4,'Lane','LN',GETDATE(),NULL,'TrefStreetType_tbl.sql','TrefStreetType_tbl.sql')
END

IF NOT EXISTS (SELECT 1 FROM TrefStreetType WHERE Id = 5)
BEGIN
INSERT TrefStreetType (Id,DisplayOrder,Description,Code,StartDate,EndDate,CreatedBy,ModifiedBy)
VALUES (5,5,'Highway','HWY',GETDATE(),NULL,'TrefStreetType_tbl.sql','TrefStreetType_tbl.sql')
END

SET IDENTITY_INSERT dbo.TrefStreetType OFF