/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get tables data
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
const ValidEntries: String[] = ["update", "insert", "delete", "all", "!update", "!insert", "!delete", "!all"];
export class Tables {
    private static _typeDefs = gql`
    type Query 
    {
		AllTables: [Tables]
        OneTable(name: String) : [Table]
        TableIndex(name: String) : [TableIndex]
        TableAccesses(name: String!, type: String) : [TableAccesses]
    }
    type Tables {
        TABLE_CATALOG: String
        TABLE_SCHEMA: String
        TABLE_NAME: String
        TABLE_TYPE: String
    }
    type Table {
        TABLE_CATALOG: String
        TABLE_SCHEMA: String
        TABLE_NAME: String
        COLUMN_NAME: String
        ORDINAL_POSITION: Int
        COLUMN_DEFAULT: String
        IS_NULLABLE: String
        DATA_TYPE: String
        CHARACTER_MAXIMUM_LENGTH: String
        CHARACTER_OCTET_LENGTH: String
        NUMERIC_PRECISION: String
        NUMERIC_PRECISION_RADIX: String
        NUMERIC_SCALE: String
        DATETIME_PRECISION: String
        CHARACTER_SET_CATALOG : String
        CHARACTER_SET_SCHEMA : String
        CHARACTER_SET_NAME : String
        COLLATION_CATALOG: String
        COLLATION_SCHEMA: String
        COLLATION_NAME: String
        DOMAIN_CATALOG: String
        DOMAIN_SCHEMA: String
        DOMAIN_NAME: String

    }
    type TableIndex {
        index_name: String
        index_description: String
        index_keys: String

    }
    type TableAccesses {
        name: String
        object_id: Int
        principal_id: String
        schema_id : Int
        parent_object_id: Int
        type : String
        type_desc: String
        create_date: Date
        modify_date: Date
        is_ms_shipped: Int
        is_published: Int
        is_schema_published: Int
        is_auto_executed: Int
        is_execution_replicated: Int
        is_repl_serialize_only: Int
        skips_repl_constraints: Int
    }`;

    private static _resolvers = {
        Query: {
            AllTables: async (root) => {
                let value = await SqlService.AllTables();
                if (value !== undefined) {
                    return value;
                }
                else {
                    throw new ErrorWithProps('Value', {
                        code: 'UNDEFINED_RETURNED_VALUE',
                       timestamp: Math.round(new Date().getTime() / 1000)
                    })
                }
            },
            OneTable: async (root, { name }) => {
                let value = await SqlService.OneTable(name);
                if (value !== undefined) {
                    return value;
                }
                else {
                    throw new ErrorWithProps('Value', {
                        code: 'UNDEFINED_RETURNED_VALUE',
                        timestamp: Math.round(new Date().getTime() / 1000)
                    })
                }
            },
            TableIndex: async (root, { name }) => {
                let value = await SqlService.TableIndex(name);
                if (value !== undefined) {
                    return value;
                }
                else {
                    throw new ErrorWithProps('Value', {
                        code: 'UNDEFINED_RETURNED_VALUE',
                        timestamp: Math.round(new Date().getTime() / 1000)
                    })
                }
            }, TableAccesses: async (root, { name, type }) => {
                type = type === undefined ? 'all' : type;
                if (!this.ValidateParams(type)) {
                    throw new ErrorWithProps('type', {
                        code: 'INVALID_TYPE',
                        message: `Invalid type ${type} - Values must be one of ${ValidEntries}`,
                        timestamp: Math.round(new Date().getTime() / 1000)
                    })

                } else {
                    let value = await SqlService.TableAccesses(this.BuildParams(name, type));
                    if (value !== undefined) {
                        return value;
                    }
                    else {
                        throw new ErrorWithProps('Value', {
                            code: 'UNDEFINED_RETURNED_VALUE',
                            timestamp: Math.round(new Date().getTime() / 1000)
                        })
                    }
                }
            },
        },

    }

    private static BuildParams(name: string, type: string): string {
        switch (type) {
            case 'update':
            case 'insert':
            case 'delete': return `%${name}%${type}%`;
            case 'all': return `%${name}%insert%update%delete%`;
            case '!update':
            case '!insert':
            case '!delete': return `%${name}%' AND OBJECT_DEFINITION(OBJECT_ID) NOT LIKE '%${type.substring(1)}%`;
            case '!all': return `%${name}%\' AND OBJECT_DEFINITION(OBJECT_ID) NOT LIKE '%update%insert%delete%`;
            default: return `%${name}%`;
        }
    }

    private static ValidateParams(type: string): Boolean {
        return ValidEntries.includes(type) ? true : false
    }

    public static get typeDefs(): any {
        return this._typeDefs;
    }
    public static get resolvers(): any {
        return this._resolvers;
    }

}