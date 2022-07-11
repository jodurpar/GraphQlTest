/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get all tables list in database
 * V1.0.0 - First version
 */
import { SqlService } from '../../services/sqlservice'
import { databasereconnecttypedefs } from "./databasereconnecttypedefs";

export class DatabaseReconnect {
    private static _typeDefs = databasereconnecttypedefs;
    private static _resolvers = {
        Query: {
            DatabaseReconnect: async (root, { server, database, user, password }) => {
                return SqlService.DatabaseReconnect(server, database, user, password);
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