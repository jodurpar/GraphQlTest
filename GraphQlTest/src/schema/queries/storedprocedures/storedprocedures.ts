/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get stored procedures data
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
import { BussinesException } from "../../../bussiness/exceptions";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../../services/sqlservice'
export class StoredProcedures {
    private static _typeDefs = gql`
    scalar Date
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
    type StoredProcedureContent {
        Text : String
    }`;
    private static _resolvers = {
        Query: {
            AllStoredProcedures: async (root) => {
                let value = await SqlService.AllStoredProcedures()
                if (value == undefined) {
                    throw BussinesException.UndefinedReturnedValue();
                }
                return value;
            },
            OneStoredProcedure: async (root, { name }) => {
                let value = await SqlService.OneStoredProcedure(name);
                if (value === undefined) {
                    throw BussinesException.UndefinedReturnedValue();
                }
                return value;
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