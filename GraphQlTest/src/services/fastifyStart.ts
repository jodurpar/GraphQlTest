import { apiData } from "../common/apiData";
import { FastifyInstance } from "fastify";

export class FastifyStart {
    public static Setup(fastify: FastifyInstance) {
        fastify.get('/', {}, function (_request: any, reply: any) {
            reply.redirect('/graphiql');
        });
        fastify.register(require('@fastify/cors'), {
            origin: ['http://localhost'],
            methods: ['GET', 'PUT', 'POST']
        });
    }
    public static startFastify = async (fastify: FastifyInstance) => {
        try {
            await fastify.listen({ port: apiData.apiPort, host: '0.0.0.0' });
            console.log(`Mercurius Server on http://localhost:${apiData.apiPort}/graphiql`);
        } catch (err) {
            fastify.log.error(err);
            console.log(err);
            process.exit(1);
        }
    };
}