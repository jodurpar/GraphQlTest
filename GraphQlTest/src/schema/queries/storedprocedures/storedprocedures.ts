/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get stored procedures data
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
export class StoredProcedures {
    private static _typeDefs = gql`
    type Query 
    {
		AllStoredProcedures: [StoredProcedureData]
        OneStoredProcedure( name: String!): [StoredProcedureContent]
    }
    type StoredProcedureData {
        schema_name: String
        name: String
        id: Int
        xtype: String
        uid: Int
        info : Int
        status: Int
        base_schema_ver: Int
        replinfo: Int
        parent_obj: Int
        crdate: String
        ftcatid: Int
        schema_ver: Int
        stats_schema_ver: Int
        type: String
        userstat: Int
        sysstat: Int
        indexdel : Int
        refdate: String
        version: Int
        deltrig: Int
        instrig: Int
        updtrig: Int
        seltrig: Int
        category: Int
        cache: Int
    }
    type StoredProcedureContent {
        Text : String
    }`;
    private static _resolvers = {
        Query: {
            AllStoredProcedures: async (root) => {
                let value = await SqlService.AllStoredProcedures();
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
            OneStoredProcedure: async (root, { name }) => {
                let value = await SqlService.OneStoredProcedure(name);
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
         },

    }
    public static get typeDefs() : any {
        return this._typeDefs;
    }
    public static get resolvers() : any {
        return this._resolvers;
    }

}