import 'reflect-metadata';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createYoga } from 'graphql-yoga';
import { builder } from './src/graphql/builder';
import { container } from './src/core/container';
import { TYPES } from './src/core/types';
import { ConfigService } from './src/services/configservice';

const fastify = Fastify({ logger: true });

async function bootstrap() {
    const config = container.resolve<ConfigService>(TYPES.ConfigService);

    // Integración Yoga con gestión de errores (SOLID - SRP)
    const yoga = createYoga({
        schema: builder.toSchema(),
        graphiql: true,
        maskedErrors: {
            maskError(error: any) {
                fastify.log.error(error);
                const masked = new Error('Internal Server Error');
                masked.name = 'InternalServerError';
                (masked as any).extensions = { code: 'INTERNAL_SERVER_ERROR' };
                return masked;
            }
        }
    });

    fastify.setErrorHandler((error, request, reply) => {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
    });

    await fastify.register(cors);

    fastify.route({
        url: '/graphql',
        method: ['GET', 'POST', 'OPTIONS'],
        handler: async (req, reply) => {
            const response = await yoga.handleNodeRequest(req, {
                req,
                reply
            } as any);

            response.headers.forEach((value, key) => {
                reply.header(key, value);
            });

            reply.status(response.status);
            const text = await response.text();
            reply.send(text);
        }
    });

    fastify.get('/favicon.ico', async (_, reply) => {
        reply.status(204).send();
    });

    fastify.get('/', async (_, reply) => {
        reply.redirect('/graphql');
    });

    try {
        const host = process.env.API_HOST || 'localhost';
        await fastify.listen({ port: config.apiPort, host });
        fastify.log.info(`🚀 GraphQL Yoga is running at http://${host}:${config.apiPort}/graphql`);
        console.log(`🚀 Server ready at http://${host}:${config.apiPort}/graphql`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

bootstrap();
