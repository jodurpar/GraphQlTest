const fastify = require('fastify')({ logger: { level: 'info'} })
import { MercuriusRegister } from './src/register/mercuriusregister'
import { SqlService } from './src/services/sqlservice'
import { apiData } from './src/common/apiData';
import { FastifyStart } from './src/services/fastifyStart';


apiData.Setup()

FastifyStart.startFastify(fastify)

MercuriusRegister.Setup(fastify);

SqlService.Setup().then(() => {
    console.log(`Sql online on : ${apiData.sqlServer}`);
}, (err) => {
    console.log(`Sql offline on : ${apiData.sqlServer}`);
});

