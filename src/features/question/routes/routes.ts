import {FastifyInstance} from "fastify";
import {QuestionSchema} from "../interfaces/question.schema";
import {GetQuestionsHandler} from "../handlers/question.handlers";

const HttpGetBaseUrl = (app: FastifyInstance) =>
    app.get('/', {
        schema: {
            response: {
                200:  QuestionSchema,
            },
        }
    }, (_, reply) => GetQuestionsHandler(reply))

export {HttpGetBaseUrl}