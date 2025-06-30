import Fastify from 'fastify'
import * as dotenv from "dotenv";

dotenv.config();

export const fastify = Fastify({
    logger: true
})
