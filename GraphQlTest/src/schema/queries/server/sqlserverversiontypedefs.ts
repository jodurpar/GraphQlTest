import { gql } from "mercurius-codegen";

export const sqlserverversiontypedefs = gql`
    
    type Query {
		SqlserverVersion( servers: [String]): [SqlserverVersionValue]
    }
    type SqlserverVersionValue {
        server: String
        version: String 
        }
    `;