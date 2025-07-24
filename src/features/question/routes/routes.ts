import {FastifyInstance} from "fastify";
import {QuestionSchema} from "../domain/question.schema";
import {GetQuestionHandler, GetQuestionsHandler, PostQuestionsHandler} from "../handlers/question.handlers";

const HttpGetQuestionsUrl = (app: FastifyInstance) =>
    app.get('/', {
        schema: {
            response: {
                200:  QuestionSchema,
            },
            querystring: {
                type: 'object',
                properties: {
                    numberOfQuestions: {type: 'number'},
                },
                required: []
            }
        }
    }, (request, reply) => GetQuestionsHandler(request, reply))

const HttpGetQuestionUrl = (app: FastifyInstance) =>
    app.get('/:id', {
        schema: {
            response: {
                200:  QuestionSchema,
            },
        }
    }, (request, reply) => GetQuestionHandler(request, reply))

const HttpPostQuestion = (app: FastifyInstance) =>
    app.post('/', {
        schema: {
            response: {
                200:  QuestionSchema,
            },
            body: {
                type: 'object',
                properties: {
                    question: {type: 'object' },
                },
                required: ['question']
            }
        }
    }, (request, reply) => PostQuestionsHandler(request, reply))

export {HttpGetQuestionsUrl, HttpGetQuestionUrl, HttpPostQuestion }