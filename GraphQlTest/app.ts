const fastify = require('fastify')({ logger: true })
import { MercuriusRegister } from './src/register/mercuriusregister'
import { SqlService } from './src/services/sqlservice'
import { apiData } from './src/common/apiData';


fastify.register(require('@fastify/cors'), {
    origin: ['http://localhost'],
    methods: ['GET', 'PUT', 'POST']
})

MercuriusRegister.Setup(fastify);
apiData.Setup()

SqlService.Setup().then(() => {
    console.log('Sql online');
}, (err) => {
    WriteDatabaseError(err);
});

const start = async () => {
    try {
        await fastify.listen({ port: apiData.apiPort })
        console.log(`Mercurius Server on http://localhost:${apiData.apiPort}/graphiql`);
    } catch (err) {
        fastify.log.error(err)
        console.log(err)
        process.exit(1)
    }
}
start()

function WriteDatabaseError(err: any) {
    console.log('')
    console.log('DATABASE ERROR.')
    console.log('Time: ' + new Date().toLocaleString())
    console.log('')
    console.log(err);
}