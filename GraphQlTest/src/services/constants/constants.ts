

export class Constants {
    public static allstoredprocedures = `Select OBJECT_SCHEMA_NAME(o.id) as schema_name,* from sysobjects o where type = 'P' and category = 0`;
    
    public static allviews = `Select OBJECT_SCHEMA_NAME(o.id) as schema_name,* from sysobjects o where type = 'V' and category = 0`;
    public static allfunctions = `SELECT
            s.name + N'.' +
            O.Name  as extended_name
            ,T.Dependencies
        FROM sys.Objects O
        JOIN sys.schemas s ON s.schema_id = o.schema_id
        OUTER APPLY
        (
            SELECT SUBSTRING(
            (
            SELECT ',' + OBJECT_NAME(D.referenced_id)
            FROM sys.SQL_Expression_Dependencies D
            WHERE D.referencing_id = O.Object_ID
            GROUP BY OBJECT_NAME(D.referenced_id)
            ORDER BY OBJECT_NAME(D.referenced_id)
            FOR XML PATH('')
            )
        ,2,4000) AS Dependencies
        ) T
        WHERE O.Type = 'FN'
        ORDER BY O.Name`;
    public static alltables = `SELECT * FROM information_schema.tables`;
    public static alldatabases = `SELECT * FROM master.sys.databases`;
}