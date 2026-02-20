import { injectable, inject } from 'tsyringe';
import { TYPES, IDatabaseService } from '../core/types';

export interface ITableRepository {
    getTablesByDatabase(dbName: string): Promise<string[]>;
    getTableData(dbName: string, tableName: string, limit?: number, offset?: number): Promise<any[]>;
    getTableTotalRows(dbName: string, tableName: string): Promise<number>;
}

@injectable()
export class TableRepository implements ITableRepository {
    constructor(
        @inject(TYPES.DatabaseService) private db: IDatabaseService
    ) { }

    public async getTablesByDatabase(dbName: string): Promise<string[]> {
        const result = await this.db.query<{ name: string }>(
            `SELECT name FROM [${dbName.replace(/]/g, ']]')}].sys.tables`
        );
        return result.map(r => r.name);
    }

    public async getTableData(dbName: string, tableName: string, limit: number = 100, offset: number = 0): Promise<any[]> {
        // Consulta dinámica segura con limitación básica (Top para mssql)
        const dbSafe = dbName.replace(/]/g, ']]');
        const tableSafe = tableName.replace(/]/g, ']]');
        // Usamos una query simple con OFFSET/FETCH para mssql si es posible,
        // o SELECT TOP para simplicidad en este ejemplo KISS.
        return await this.db.query<any>(
            `SELECT * FROM [${dbSafe}].dbo.[${tableSafe}]
             ORDER BY 1
             OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY`,
            { offset, limit }
        );
    }

    public async getTableTotalRows(dbName: string, tableName: string): Promise<number> {
        const dbSafe = dbName.replace(/]/g, ']]');
        const tableSafe = tableName.replace(/]/g, ']]');
        const result = await this.db.query<{ count: number }>(
            `SELECT COUNT(*) AS count FROM [${dbSafe}].dbo.[${tableSafe}]`
        );
        return result[0]?.count ?? 0;
    }
}
