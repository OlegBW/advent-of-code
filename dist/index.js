import { fileURLToPath } from 'url';
import path from 'path';
import Fastify from 'fastify';
import ejs from 'ejs';
import dotenv from 'dotenv';
import fastifyView from '@fastify/view';
// import Mongo from '@fastify/mongodb';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const fastify = Fastify({
    logger: true,
});
// await fastify.register(Mongo, {
//   forceClose: true,
//   url: process.env.MONGO_URL || 'mongodb://mongo/mydb',
// });
await fastify.register(fastifyView, { engine: { ejs }, templates: 'src/views' });
fastify.get('/', async (req, rep) => {
    await rep.send({ data: 'Hello, World!' });
});
fastify.get('/name', async (req, rep) => {
    await rep.view('index.ejs', { name: 'Joe' });
});
// Mongo usage example
// fastify.get('/customer/:id', async function (req, _) {
//   const customers = this.mongo.client.db('main').collection('customers');
//   if (!req.params) return;
//   const _id = new this.mongo.ObjectId((req.params as { id: string }).id);
//   try {
//     const customer = await customers.findOne({ _id });
//     return customer;
//   } catch (err) {
//     return err;
//   }
// });
const port = Number(process.env.PORT) || 3000;
fastify.listen({ port }, (err, _) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
//# sourceMappingURL=index.js.map