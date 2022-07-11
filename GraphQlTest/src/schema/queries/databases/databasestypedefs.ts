import { gql } from "mercurius-codegen";

export const databasestypedefs = gql`
    scalar Date
    type Query 
    {
		AllDatabases: [DatabasesValue]
		OneDatabase( name: String!): [DatabasesValue]
    }
    type DatabasesValue {
        name: String
        database_id: String
        source_database_id: String
        owner_sid: String
        create_date: Date
        compatibility_level: String
        collation_name: String
        user_access: String
        user_access_desc: String
        is_read_only: String
        is_auto_close_on: String,
        is_auto_shrink_on: String,
        state: String
        state_desc: String
        s_in_standby: String
        s_cleandly_shutdown: String
        s_supplementary_loggin_enabled: String
        s_read_committed_snapshot_on: String
        ecovery_model: String
        ecovery_model_desc: String
        age_verify_option: String
        age_verify_option_desc: String
        s_auto_create_stats_on: String
        s_auto_create_stats_incremental_on: String
        s_auto_update_stats_on: String
        s_auto_update_stats_async_on: String
        catalog_collation_type_desc: String
        physical_database_name: String
    }`;