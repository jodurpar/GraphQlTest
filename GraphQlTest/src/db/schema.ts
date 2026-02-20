import { sql } from 'drizzle-orm';
// @ts-ignore
import { text, pgTable, serial } from 'drizzle-orm/pg-core'; // Nota: Usaremos el core genérico o adaptadores según disponibilidad, mssql es similar
// @ts-ignore
import { mssqlTable, varchar } from 'drizzle-orm/mssql-core';

// Definición de tablas del sistema para tipado estricto
// @ts-ignore
export const databases = mssqlTable('databases', {
    name: varchar('name', { length: 128 }).notNull(),
}, (t: any) => ({
    // Acceso vía sys.databases
}));

// @ts-ignore
export const tables = mssqlTable('tables', {
    name: varchar('name', { length: 128 }).notNull(),
    schema_id: serial('schema_id'),
});
