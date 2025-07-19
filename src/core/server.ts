import {fastify} from "./app";
import fastifyCors from '@fastify/cors';

registerCors()

// ROUTES
import '../features/question/routes/question.routes';

// Run the server!
async function run(){
    try {
        await fastify.listen({port: 1400})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

async function registerCors() {
    await fastify.register(fastifyCors, {
        origin: ["http://localhost:5173"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    });
}

run();