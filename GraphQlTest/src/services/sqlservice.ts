/******************************************************************
 * 04/06/2022 - Jos� Dur�n Pareja
 * 
 * SqlService to access sqlserver
 * V1.0.0 - First version
 */

import { ConfigService } from "./configService";
import { apiData } from '../common/apiData';
import { Constants } from "./constants/constants";

var sql = require("mssql");

interface SqlVersion {
    server: string,
    version: string
}

export class SqlService {
    public static Setup(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            let config = await ConfigService.Get();
            if (config !== undefined) {
                sql.connect(config, async function (err: any) {
                    if (err) {
                        SqlService.WriteDatabaseError(err);
                        reject(err);
                    }
                    else {
                        resolve(sql);
                    }
                });
            }
            else {
                reject("Must configure _Apidata.")
            }
        });
    }
    public static async DatabaseReconnect(server: string, database: string, user: string, password: string): Promise<any[]> {
        sql.close();
        apiData.sqlServer = server === undefined ? apiData.sqlServer : server;
        apiData.sqlDatabase = database === undefined ? apiData.sqlDatabase : database;
        apiData.user = user === undefined ? apiData.user : user;
        apiData.password = password === undefined ? apiData.password : password;
        ConfigService.Refresh();
        await this.Setup();
        return Promise.resolve([{ Text: `Sql online on : ${apiData.sqlServer}` }, { Text: `Database : ${apiData.sqlDatabase}` }]);
    }
    public static async SqlserverVersion(servers: [string]): Promise<any[]> {
        let results: Array<SqlVersion> = [];
        let version = '';
        if (servers == undefined) {
            servers = [`${apiData.sqlServer}`]
        };
        for (var j = 0; j < servers.length ; j++) {
            await this.DatabaseReconnect(servers[j], undefined, undefined, undefined);
            let version = await this.CallSqlServer(`SELECT @@Version as version`);
            console.log(version)
            results.push({
                server: servers[j],
                version: version[0].version
            })
        }
        return results;
    }
    public static AllStoredProcedures(): Promise<any[]> {
        return this.CallSqlServer(Constants.allstoredprocedures)
    }
    public static async OneStoredProcedure(name: string): Promise<any[]> {
        let complete_name = await this.GetStoredProcedureCompleteName(name)
        return this.CallSqlServer(`exec sp_helptext  N\'${complete_name}\'`)
    }
    public static AllViews(): Promise<any[]> {
        return this.CallSqlServer(Constants.allviews)
    }
    public static async OneView(name: string): Promise<any[]> {
        let complete_name = name.indexOf('.') !== -1 ? name : await this.GetViewsCompleteName(name)
        return this.CallSqlServer(`exec sp_helptext  N\'${complete_name}\'`)
    }
    public static AllFunctions(): Promise<any[]> {
        return this.CallSqlServer(Constants.allfunctions)
    }
    public static async OneFunction(name: string): Promise<any[]> {
        let complete_name = name.indexOf('.') !== -1 ? name : await this.GetFunctionCompleteName(name)
        return this.CallSqlServer(`exec sp_helptext  N\'${complete_name}\'`);
    }
    public static UseThisFunction(name: string): Promise<any[]> {
        return this.CallSqlServer(`SELECT * FROM sys.procedures WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '%${name}%' `)
    }
    public static AllTables(): Promise<any[]> {
        return this.CallSqlServer(Constants.alltables);
    }
    public static async OneTable(name: string): Promise<any[]> {
        return this.CallSqlServer(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS  WHERE TABLE_NAME = '${name}'  `)
    }
    public static async TableIndex(name: string): Promise<any[]> {
        let complete_name = name.indexOf('.') !== -1 ? name : await this.GetTableCompleteName(name);
        return this.CallSqlServer(`exec sp_helpindex  N\'${complete_name}\'`);
    }
    public static TableAccesses(type: string): Promise<any[]> {
        return this.CallSqlServer(`SELECT * FROM sys.procedures WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '${type}' `);

    }
    public static FindColumn(name: string): Promise<any[]> {
        return this.CallSqlServer(`select  table_name, column_name 
                                    from information_schema.columns
                                    where column_name like '%${name}%' 
                                    order by table_name, column_name `)
    }
    public static AllDatabases(): Promise<any[]> {
        return this.CallSqlServer(Constants.alldatabases);
    }
    public static OneDatabase(name: string): Promise<any[]> {
        return this.CallSqlServer(`SELECT * FROM master.sys.databases where name = '${name}'`)
    }
    private static async GetTableCompleteName(name): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let complete_name = await this.CallSqlServer(`SELECT TABLE_SCHEMA + N'.' + 
                        TABLE_NAME as extended_name FROM information_schema.tables WHERE TABLE_NAME = '${name}'
                        `);
            complete_name.length > 0 ? resolve(complete_name[0].extended_name) : resolve(name);
        })
    }
    private static async GetStoredProcedureCompleteName(name): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let complete_name = await this.CallSqlServer(`SELECT s.name + N'.' + p.name as extended_name
                FROM sys.procedures p
                JOIN sys.schemas s ON p.schema_id = s.schema_id
                WHERE p.name = '${name}'
                `);
            complete_name.length > 0 ? resolve(complete_name[0].extended_name) : resolve(name);
        })
    }
    private static async GetFunctionCompleteName(name): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let complete_name = await this.CallSqlServer(`SELECT s.name + N'.' + o.name as extended_name
                FROM sys.objects o
                JOIN sys.schemas s ON o.schema_id = s.schema_id
                WHERE o.name = '${name}'
                `);
            complete_name.length > 0 ? resolve(complete_name[0].extended_name) : resolve(name);
        })
    }
    private static async GetViewsCompleteName(name): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            let complete_name = await this.CallSqlServer(`Select OBJECT_SCHEMA_NAME(o.id) + N'.' + o.name as extended_name 
                from sysobjects o   
				where type = 'V' and category = 0 and name = '${name}'
                `);
            complete_name?.length > 0 ? resolve(complete_name[0].extended_name) : resolve(name)
        })
    }
    private static CallSqlServer(sentence: string): Promise<any[]> {
        var request = new sql.Request();
        return new Promise<any>((resolve, reject) => {
            request.query(sentence, function (err: any, result: { recordset: any[]; }) {
                if (err) {
                    resolve(err);
                }
                else {
                    resolve(result.recordset);;
                }
            });
        })
    }

    private static WriteDatabaseError(err: any) {
        console.log('')
        console.log('DATABASE ERROR.')
        console.log('Time: ' + new Date().toLocaleString())
        console.log('')
        console.log(err);
    }
}