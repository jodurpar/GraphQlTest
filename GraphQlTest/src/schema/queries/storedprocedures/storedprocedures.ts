/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get stored procedures data
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { storedprocedurestypedefs } from "./storedprocedurestypedefs";
export class StoredProcedures {
    private static _typeDefs = storedprocedurestypedefs;
    private static _resolvers = {
        Query: {
            AllStoredProcedures: async (root) => {
                return SqlService.AllStoredProcedures();
            },
            OneStoredProcedure: async (root, { name }) => {
                return SqlService.OneStoredProcedure(name);
            },
         }
    }
    public static get typeDefs() : any {
        return this._typeDefs;
    }
    public static get resolvers() : any {
        return this._resolvers;
    }
}