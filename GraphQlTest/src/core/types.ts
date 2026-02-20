export const TYPES = {
    ConfigService: Symbol.for('ConfigService'),
    DatabaseService: Symbol.for('DatabaseService'),
    DatabaseRepository: Symbol.for('DatabaseRepository'),
    TableRepository: Symbol.for('TableRepository'),
    SchemaBuilder: Symbol.for('SchemaBuilder'),
};

export interface IDatabaseService {
    connect(): Promise<void>;
    query<T>(sql: string, params?: Record<string, any>): Promise<T[]>;
    execute(sql: string, params?: Record<string, any>): Promise<void>;
}
