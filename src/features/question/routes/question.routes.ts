import {fastify} from "../../../core/app";
import {GetQuestions} from "../handlers/question.handlers";

fastify.route({
    method: 'GET',
    url: '/questions',
    schema: {
        // request needs to have a querystring with a `name` parameter
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string'}
            },
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            200: {
                type: 'object',
                properties: {
                    hello: { type: 'string' }
                }
            }
        }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
        // E.g. check authentication
    },
    handler: async (request, reply) => GetQuestions()
})