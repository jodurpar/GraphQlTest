/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get tables data
 * V1.0.0 - First version
 */
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
import { tablestypedefs } from "./tablestypedefs";
const ValidEntries: string[] = ["update", "insert", "delete", "all", "!update", "!insert", "!delete", "!all"];
export class Tables {
    private static _typeDefs = tablestypedefs;
  

    private static _resolvers = {
        Query: {
            AllTables: async (root) => {
                return SqlService.AllTables();
            },
            OneTable: async (root, { name }) => {
                return SqlService.OneTable(name);
            },
            TableIndex: async (root, { name }) => {
                return SqlService.TableIndex(name);
            },
            TableAccesses: async (root, { name, type }) => {
                type = type === undefined ? 'all' : type;
                if (!this.ValidateParams(type)) {
                    throw new ErrorWithProps('type', {
                        code: 'INVALID_TYPE',
                        message: `Invalid type ${type} - Values must be one of ${ValidEntries}`,
                        timestamp: Math.round(new Date().getTime() / 1000)
                    })

                } else {
                    return SqlService.TableAccesses(this.BuildParams(name, type));
                }
            }
        }
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

    private static ValidateParams(type: string): boolean {
        return ValidEntries.includes(type) ? true : false
    }

    public static get typeDefs(): any {
        return this._typeDefs;
    }
    public static get resolvers(): any {
        return this._resolvers;
    }

}