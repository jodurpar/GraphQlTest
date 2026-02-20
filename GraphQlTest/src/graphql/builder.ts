import SchemaBuilder from '@pothos/core';
import { container } from '../core/container';
import { TYPES } from '../core/types';
import { IDatabaseRepository } from '../repositories/database-repository';
import { ITableRepository } from '../repositories/table-repository';

// Definición de Interfaces para Pothos (DRY)
interface Database {
    name: string;
}

interface Table {
    name: string;
    databaseName: string; // Necesario para el contexto de la query
}

export const builder = new SchemaBuilder<{
    Scalars: {
        JSON: { Input: any; Output: any };
    };
    Objects: {
        Database: Database;
        Table: Table;
    };
}>({});

// Registro del Escalar JSON (vía graphql-scalars sería ideal, pero lo definimos explícitamente para simplificar)
builder.scalarType('JSON', {
    serialize: (output) => output,
    parseValue: (input) => input,
});

// Definición de Objetos (Clean Code)
builder.objectType('Table', {
    fields: (t) => ({
        name: t.exposeString('name'),
        rows: t.field({
            type: ['JSON'],
            args: {
                limit: t.arg.int({ defaultValue: 10 }),
                offset: t.arg.int({ defaultValue: 0 }),
            },
            resolve: async (parent, { limit, offset }) => {
                const repo = container.resolve<ITableRepository>(TYPES.TableRepository);
                try {
                    const rows = await repo.getTableData(parent.databaseName, parent.name, limit ?? 10, offset ?? 0);
                    console.log(`Fetched rows for table ${parent.databaseName}.${parent.name} limit=${limit} offset=${offset}:`, rows.length);
                    return rows;
                } catch (e) {
                    console.error('Error fetching rows for table', parent.name, e);
                    return [];
                }
            },
        }),
        totalRows: t.field({
            type: 'Int',
            resolve: async (parent) => {
                const repo = container.resolve<ITableRepository>(TYPES.TableRepository);
                try {
                    const total = await repo.getTableTotalRows(parent.databaseName, parent.name);
                    return total;
                } catch (e) {
                    console.error('Error fetching total rows for table', parent.name, e);
                    return 0;
                }
            },
        }),
    }),
});

builder.objectType('Database', {
    fields: (t) => ({
        name: t.exposeString('name'),
        tables: t.field({
            type: ['Table'],
            resolve: async (parent) => {
                const repo = container.resolve<ITableRepository>(TYPES.TableRepository);
                try {
                    const tableNames = await repo.getTablesByDatabase(parent.name);
                    return tableNames.map((name) => ({
                        name,
                        databaseName: parent.name
                    }));
                } catch (e) {
                    console.error('Error fetching tables for database', parent.name, e);
                    return [];
                }
            },
        }),
    }),
});

builder.queryType({
    fields: (t) => ({
        allDatabases: t.field({
            type: ['Database'],
            resolve: async () => {
                const repo = container.resolve<IDatabaseRepository>(TYPES.DatabaseRepository);
                const dbNames = await repo.getAll();
                return dbNames.map((name) => ({ name }));
            },
        }),
        oneDatabase: t.field({
            type: 'Database',
            args: {
                name: t.arg.string({ required: true }),
            },
            nullable: true,
            resolve: async (_, { name }) => {
                const repo = container.resolve<IDatabaseRepository>(TYPES.DatabaseRepository);
                const dbName = await repo.getByName(name);
                return dbName ? { name: dbName } : null;
            },
        }),
    }),
});
