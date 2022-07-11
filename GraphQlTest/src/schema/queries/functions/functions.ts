/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get functions list and content in sql database
 * V1.0.0 - First version
 */
import { SqlService } from '../../../services/sqlservice'
import { functionstypedefs } from "./functionstypedefs";
export class Functions {
    private static _typeDefs = functionstypedefs;
    private static _resolvers = {
        Query: {
            AllFunctions: async (root) => {
                return SqlService.AllFunctions();
            },
            OneFunction: async (root, { name }) => {
                return SqlService.OneFunction(name);
            },
            UseThisFunction: async (root, { name }) => {
                return SqlService.UseThisFunction(name);
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