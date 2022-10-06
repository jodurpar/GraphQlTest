import { gql } from "mercurius-codegen";

export const findcolumntypedefs = gql`
    
    type Query {
		FindColumn( name: String!): [FindColumnValue]
    }
    type FindColumnValue {
        table_name: String
        column_name: String 
        }
    `;