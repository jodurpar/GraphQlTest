import { gql } from "mercurius-codegen";

export const tablestypedefs = gql`
    type Query 
    {
		AllTables: [Tables]
        OneTable(name: String) : [Table]
        TableIndex(name: String) : [TableIndex]
        TableAccesses(name: String!, type: String) : [TableAccesses]
    }
    type Tables {
        TABLE_CATALOG: String
        TABLE_SCHEMA: String
        TABLE_NAME: String
        TABLE_TYPE: String
    }
    type Table {
        TABLE_CATALOG: String
        TABLE_SCHEMA: String
        TABLE_NAME: String
        COLUMN_NAME: String
        ORDINAL_POSITION: Int
        COLUMN_DEFAULT: String
        IS_NULLABLE: String
        DATA_TYPE: String
        CHARACTER_MAXIMUM_LENGTH: String
        CHARACTER_OCTET_LENGTH: String
        NUMERIC_PRECISION: String
        NUMERIC_PRECISION_RADIX: String
        NUMERIC_SCALE: String
        DATETIME_PRECISION: String
        CHARACTER_SET_CATALOG : String
        CHARACTER_SET_SCHEMA : String
        CHARACTER_SET_NAME : String
        COLLATION_CATALOG: String
        COLLATION_SCHEMA: String
        COLLATION_NAME: String
        DOMAIN_CATALOG: String
        DOMAIN_SCHEMA: String
        DOMAIN_NAME: String

    }
    type TableIndex {
        index_name: String
        index_description: String
        index_keys: String

    }
    type TableAccesses {
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