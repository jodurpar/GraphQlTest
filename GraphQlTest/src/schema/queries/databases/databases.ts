/******************************************************************
 * 05/06/2022 - Jose Durán Pareja
 * 
 * Get all databases
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { databasestypedefs } from "./databasestypedefs";
export class Databases {
    private static _typeDefs = databasestypedefs;
    private static _resolvers = {
        Query: {
            AllDatabases: async (root) => {
                return SqlService.AllDatabases();
            },
            OneDatabase: async (root, { name }) => {
                return SqlService.OneDatabase(name);
            }
        }
    }
    public static get typeDefs(): any {
        return this._typeDefs;
    }
    public static get resolvers(): any {
        return this._resolvers;
    }

}