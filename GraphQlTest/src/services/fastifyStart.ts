import { apiData } from "../common/apiData";


export class FastifyStart {
    public static Setup(fastify) {
        fastify.get('/', {}, function (_request, reply) {
            reply.redirect('/graphiql')
        });
        fastify.register(require('@fastify/cors'), {
            origin: ['http://localhost'],
            methods: ['GET', 'PUT', 'POST']
        })
    }
    public static startFastify = async (fastify) => {
        try {
            await fastify.listen({ port: apiData.apiPort, host: '0.0.0.0' })
            console.log(`Mercurius Server on http://localhost:${apiData.apiPort}/graphiql`);
        } catch (err) {
            fastify.log.error(err)
            console.log(err)
            process.exit(1)
        }
    }
}