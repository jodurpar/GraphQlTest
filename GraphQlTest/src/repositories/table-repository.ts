import { injectable, inject } from 'tsyringe';
import { TYPES, IDatabaseService } from '../core/types';

export interface ITableRepository {
    getTablesByDatabase(dbName: string): Promise<string[]>;
    getTableData(dbName: string, tableName: string, limit?: number, offset?: number, field?: string): Promise<any[]>;
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

    public async getTableData(dbName: string, tableName: string, limit: number = 100, offset: number = 0, field?: string): Promise<any[]> {
        const dbSafe = dbName.replace(/]/g, ']]');
        const tableSafe = tableName.replace(/]/g, ']]');

        // Si se especifica field, lo escapamos para evitar inyección (aunque lo ideal sería validar contra el esquema)
        const selectCols = field ? `[${field.replace(/]/g, ']]')}]` : '*';

        return await this.db.query<any>(
            `SELECT ${selectCols} FROM [${dbSafe}].dbo.[${tableSafe}]
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
