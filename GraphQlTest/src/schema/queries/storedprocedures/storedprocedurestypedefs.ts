import { gql } from "mercurius-codegen";

export const storedprocedurestypedefs = gql`
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