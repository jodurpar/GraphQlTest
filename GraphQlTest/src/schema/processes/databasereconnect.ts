/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Get all tables list in database
 * V1.0.0 - First version
 */
import { gql } from "mercurius-codegen";
const { ErrorWithProps } = require('mercurius')
import { SqlService } from '../../services/sqlservice'


export class DatabaseReconnect {
    private static _typeDefs = gql`
    type Query 
    {
		DatabaseReconnect( server: String, database: String, user: String, password: String): [DatabaseReconnect]
    }
    type DatabaseReconnect {
        Text: String
    }`;
    private static _resolvers = {
        Query: {
            DatabaseReconnect: async (root, { server, database, user, password }) => {
                let value = await SqlService.DatabaseReconnect(server, database, user, password);
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