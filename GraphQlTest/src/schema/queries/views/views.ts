/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get all views data
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
export class Views {
    private static _typeDefs = gql`
    scalar Date
    type Query 
    {
		AllViews: [ViewsData]
        OneView( name: String!): [ViewContent]
    }
    type ViewsData {
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
        crdate: Date
        ftcatid: Int
        schema_ver: Int
        stats_schema_ver: Int
        type: String
        userstat: Int
        sysstat: Int
        indexdel : Int
        refdate: Date
        version: Int
        deltrig: Int
        instrig: Int
        updtrig: Int
        seltrig: Int
        category: Int
        cache: Int
    }
    type ViewContent {
        Text : String
    }`;
    private static _resolvers = {
        Query: {
            AllViews: async (root) => {
                let value = await SqlService.AllViews();
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
            OneView: async (root, { name }) => {
                let value = await SqlService.OneView(name);
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