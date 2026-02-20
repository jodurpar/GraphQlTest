import { injectable } from 'tsyringe';
import { apiData } from '../common/apiData';

@injectable()
export class ConfigService {
    public get dbConfig() {
        return {
            user: apiData.user,
            password: apiData.password,
            server: apiData.sqlServer,
            database: apiData.sqlDatabase,
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