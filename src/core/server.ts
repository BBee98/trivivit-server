// ROUTES

import '../features/question/routes/question.routes';
import {fastify} from "./app";

// Run the server!
async function run(){
    try {
        await fastify.listen({port: 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

run();