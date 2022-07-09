/******************************************************************
 * 04/06/2022 - Jose Durán Pareja
 * 
 * Register mercurius schema and resolvers
 * V1.0.0 - First version
 */
const mercurius = require('mercurius')
import { makeExecutableSchema } from '@graphql-tools/schema'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { StoredProcedures } from '../schema/queries/storedprocedures/storedprocedures'
import { Views } from '../schema/queries/views/views'
import { Tables } from '../schema/queries/tables/tables'
import { Functions } from '../schema/queries/functions/functions'
import { Databases } from '../schema/queries/databases/databases'
import { DatabaseReconnect  } from '../schema/processes/databasereconnect'
const { ScalarNameTypeDefinition, ScalarNameResolver  } = require('graphql-scalars');
export class MercuriusRegister {
    public static Setup(app: any) {
        app.register(mercurius, {
            schema: makeExecutableSchema({
                typeDefs: mergeTypeDefs([
                    ScalarNameTypeDefinition,
                    StoredProcedures.typeDefs,
                    Views.typeDefs,
                    Functions.typeDefs,
                    Databases.typeDefs,
                    Tables.typeDefs,
                    DatabaseReconnect.typeDefs,
                ]),
                resolvers: mergeResolvers([
                    ScalarNameResolver,
                    StoredProcedures.resolvers,
                    Views.resolvers,
                    Functions.resolvers,
                    Databases.resolvers,
                    Tables.resolvers,
                    DatabaseReconnect.resolvers,
                ]),
            }),
            graphiql: true,
        });
    }
}