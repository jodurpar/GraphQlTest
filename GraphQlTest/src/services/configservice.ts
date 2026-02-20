import { injectable } from 'tsyringe';
import { apiData } from '../common/apiData';

@injectable()
export class ConfigService {
    public get dbConfig() {
        return {
            user: process.env.DB_USER || apiData.user,
            password: process.env.DB_PASSWORD || apiData.password,
            server: process.env.DB_SERVER || apiData.sqlServer,
            database: process.env.DB_NAME || apiData.sqlDatabase,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };
    }

    public get apiPort(): number {
        return apiData.apiPort;
    }
}