/******************************************************************
 * 05/06/2022 - Jose Durán Pareja
 * 
 * Get all databases
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { sqlserverversiontypedefs } from "./sqlserverversiontypedefs";
export class SqlserverVersion {
    private static _typeDefs = sqlserverversiontypedefs;
    private static _resolvers = {
        Query: {
            SqlserverVersion: async (root, { servers }) => {
                return SqlService.SqlserverVersion(servers);
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