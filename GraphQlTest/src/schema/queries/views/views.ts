/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get all views data
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { viewstypedefs } from "./viewstypedefs";
export class Views {
    private static _typeDefs = viewstypedefs
    private static _resolvers = {
        Query: {
            AllViews: async (root) => {
                return SqlService.AllViews();
            },
            OneView: async (root, { name }) => {
                return SqlService.OneView(name);
            }
         }
    }
    public static get typeDefs() : any {
        return this._typeDefs;
    }
    public static get resolvers() : any {
        return this._resolvers;
    }
}