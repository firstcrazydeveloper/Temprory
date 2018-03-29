-- Sql broker is an integral part of the ReferenceData solution and as such we must ensure that it always are enabled
-- Please ensure that the required security are also enabled refer to SQLBrokerPermissions.sql

DECLARE @isActive BIT = (SELECT IS_BROKER_ENABLED FROM sys.databases WHERE name = '' + DB_NAME() + '');
DECLARE @sql varchar(200)
IF @isActive = 0
		BEGIN
				SET @sql = 'ALTER DATABASE ' + QUOTENAME(DB_NAME()) + ' SET NEW_BROKER WITH ROLLBACK IMMEDIATE;'
				EXEC(@sql)
		END
ELSE
		PRINT 'Broker is enabled on database ' + DB_NAME()
