import { injectable, inject } from 'tsyringe';
import { TYPES, IDatabaseService } from '../core/types';

export interface IDatabaseRepository {
    getAll(): Promise<string[]>;
    getByName(name: string): Promise<string | null>;
}

@injectable()
export class DatabaseRepository implements IDatabaseRepository {
    constructor(
        @inject(TYPES.DatabaseService) private db: IDatabaseService
    ) { }

    public async getAll(): Promise<string[]> {
        // Uso de queries parametrizadas (implícito en el futuro ORM, aquí manual por ahora para KISS)
        const result = await this.db.query<{ name: string }>(
            'SELECT name FROM sys.databases WHERE database_id > 4'
        );
        return result.map(r => r.name);
    }

    public async getByName(name: string): Promise<string | null> {
        // Evitamos SQL Injection mediante parametrización real
        const result = await this.db.query<{ name: string }>(
            `SELECT name FROM sys.databases WHERE name = @name`,
            { name }
        );
        return result[0]?.name || null;
    }
}
