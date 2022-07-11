import { gql } from "mercurius-codegen";

export const databasereconnecttypedefs = gql`
    type Query 
    {
		DatabaseReconnect( server: String, database: String, user: String, password: String): [DatabaseReconnect]
    }
    type DatabaseReconnect {
        Text: String
    }`;