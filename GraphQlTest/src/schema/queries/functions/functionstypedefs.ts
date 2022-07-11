import { gql } from "mercurius-codegen";

export const functionstypedefs = gql`
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