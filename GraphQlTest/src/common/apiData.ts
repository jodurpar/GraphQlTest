/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Contains api basic data
 * V1.0.0 - First version
 */
export class apiData {
    private static _apiName: string = 'dsGraphQAAidaTestpi';
    private static _apiVersion: string = '1.0.0';
    private static _user: string = 'sa';
    private static _password: string = '1234_asdf';
    private static _apiPort: number = 51240;
    private static _sqlServer: string = 'host.docker.internal';
    private static _sqlDatabase: string = 'WideWorldImporters';
    private static _apiDescription: string = 'GraphQL to query SqlServer object, with mercutius, mssql and fastify';
    static get apiName(): string {
        return apiData._apiName;
    }
    static get apiVersion(): string {
        return apiData._apiVersion;
    }
    static get user(): string {
        return apiData._user;
    }
    static set user(value: string) {
        apiData._user = value;
    }
    static get password(): string {
        return apiData._password;
    }
    static set password(value: string) {
        apiData._password = value;
    }
    static get apiPort(): number {
        return apiData._apiPort;
    }
    static get sqlServer(): string {
        return apiData._sqlServer;
    }
    static set sqlServer(value: string) {
        apiData._sqlServer = value;
    }
    static get sqlDatabase(): string {
        return apiData._sqlDatabase;
    }
    static set sqlDatabase(value: string) {
        apiData._sqlDatabase = value;
    }

    static get apiDescription(): string {
        return apiData._apiDescription;
    }
    public static Setup() {
        for (let j = 0; j < process.argv.length; j++) {
            let arg = process.argv[j].toLowerCase();
            switch (arg) {
                case '--user':
                case '--u': apiData._user = process.argv[j + 1];
                    break;
                case '--apiport':
                case '--p': apiData._apiPort = parseInt(process.argv[j + 1]);
                    break;
                case '--description':
                case '--d': apiData._apiDescription = process.argv[j + 1];
                    break
                case '--name':
                case '--n': apiData._apiName = process.argv[j + 1];
                    break;
                case '--password':
                case '--w': apiData._password = process.argv[j + 1];
                    break;
                case '--database':
                case '--g': apiData._sqlDatabase = process.argv[j + 1];
                    break;
                case '--sqlserver':
                case '--s': apiData._sqlServer = process.argv[j + 1];
                    break;
                default: break;
            }
        }
    }

}

