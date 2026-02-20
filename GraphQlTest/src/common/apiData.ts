export class apiData {
    private static _apiName: string = 'dsSqlGraphQLapi';
    private static _apiDescription: string = 'GraphQL to query SqlServer objects';
    private static _apiVersion: string = '1.0.0';
    private static _user: string = 'sa';
    private static _password: string = '1234_asdf';
    private static _sqlServer: string = 'localhost'; // Ajustado para desarrollo local en Windows
    private static _sqlDatabase: string = 'master';
    private static _apiPort: number = 15250;

    static get apiName(): string { return this._apiName; }
    static get apiDescription(): string { return this._apiDescription; }
    static get apiVersion(): string { return this._apiVersion; }
    static get user(): string { return this._user; }
    static set user(value: string) { this._user = value; }
    static get password(): string { return this._password; }
    static set password(value: string) { this._password = value; }
    static get sqlServer(): string { return this._sqlServer; }
    static set sqlServer(value: string) { this._sqlServer = value; }
    static get sqlDatabase(): string { return this._sqlDatabase; }
    static set sqlDatabase(value: string) { this._sqlDatabase = value; }
    static get apiPort(): number { return this._apiPort; }

    static init() {
        if (typeof process === 'undefined' || !process.argv) return;
        for (let j = 0; j < process.argv.length; j++) {
            switch (process.argv[j].toLowerCase()) {
                case '--u':
                case '--user':
                    if (process.argv[j + 1]) this._user = process.argv[j + 1];
                    break;
                case '--p':
                case '--password':
                    if (process.argv[j + 1]) this._password = process.argv[j + 1];
                    break;
                case '--s':
                case '--server':
                    if (process.argv[j + 1]) this._sqlServer = process.argv[j + 1];
                    break;
                case '--d':
                case '--database':
                    if (process.argv[j + 1]) this._sqlDatabase = process.argv[j + 1];
                    break;
                case '--port':
                    if (process.argv[j + 1]) this._apiPort = parseInt(process.argv[j + 1]);
                    break;
            }
        }
    }
}

apiData.init();
