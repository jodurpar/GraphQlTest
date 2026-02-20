import { injectable, inject } from 'tsyringe';
import mssql from 'mssql';
import { TYPES, IDatabaseService } from '../core/types';
import { ConfigService } from './configservice';

@injectable()
export class SqlService implements IDatabaseService {
    private pool: mssql.ConnectionPool | null = null;

    constructor(
        @inject(TYPES.ConfigService) private config: ConfigService
    ) { }

    public async connect(): Promise<void> {
        if (!this.pool) {
            this.pool = await new mssql.ConnectionPool(this.config.dbConfig).connect();
        }
    }

    public async query<T>(sql: string, params?: Record<string, any>): Promise<T[]> {
        await this.connect();
        const request = this.pool!.request();
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
        }
        const result = await request.query(sql);
        return result.recordset;
    }

    public async execute(sql: string, params?: Record<string, any>): Promise<void> {
        await this.connect();
        const request = this.pool!.request();
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
        }
        await request.query(sql);
    }
}
