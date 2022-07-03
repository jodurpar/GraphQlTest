/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get functions list and content in sql database
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
export class Functions {
    private static _typeDefs = gql`
    scalar Date
    type Query 
    {
		AllFunctions: [FunctionData]
        OneFunction( name: String!): [FunctionContent]
        UseThisFunction(name: String!, type: String) : [FunctionUse]
    }
    type FunctionData {
        extended_name: String
        Dependencies: String
    }
    type FunctionContent {
        Text : String
    }
    type FunctionUse {
        name: String
        object_id: Int
        principal_id: String
        schema_id : Int
        parent_object_id: Int
        type : String
        type_desc: String
        create_date: Date
        modify_date: Date
        is_ms_shipped: Int
        is_published: Int
        is_schema_published: Int
        is_auto_executed: Int
        is_execution_replicated: Int
        is_repl_serialize_only: Int
        skips_repl_constraints: Int
    }`; 
    private static _resolvers = {
        Query: {
            AllFunctions: async (root) => {
                let value = await SqlService.AllFunctions();
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
            OneFunction: async (root, { name }) => {
                let value = await SqlService.OneFunction(name);
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
            UseThisFunction: async (root, { name }) => {
                let value = await SqlService.UseThisFunction(name);
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
    public static get typeDefs(): any {
        return this._typeDefs;
    }
    public static get resolvers(): any {
        return this._resolvers;
    }

}