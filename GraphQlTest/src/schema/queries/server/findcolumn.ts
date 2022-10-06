/******************************************************************
 * 06/10/2022 - Jose Durán Pareja
 * 
 * Get tables where columns is
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { findcolumntypedefs } from "./findcolumntypedefs";
export class FindColumn {
    private static _typeDefs = findcolumntypedefs;
    private static _resolvers = {
        Query: {
            FindColumn: async (root, { name }) => {
                return SqlService.FindColumn(name);
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