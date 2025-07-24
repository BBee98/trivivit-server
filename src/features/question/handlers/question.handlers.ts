import {FastifyReply, FastifyRequest} from "fastify";
import {StoredQuestions} from "../domain/question.schema";
import {ReadFile, WriteFile} from "../../../core/db";

const DEFAULT_NUMBER_OF_QUESTIONS = 10;
const LIMIT_NUMBER_OF_QUESTIONS = 50;

export async function GetQuestionsHandler(request: FastifyRequest, reply: FastifyReply) {

    const { numberOfQuestions } = request.params;

    if(numberOfQuestions && numberOfQuestions > LIMIT_NUMBER_OF_QUESTIONS){
        return reply.send(
            {
                response_code: 400,
                message: `${numberOfQuestions} is greater than the limit of ${LIMIT_NUMBER_OF_QUESTIONS}`
            }
        )
    }

    const baseUrl = process.env.TRIVIA_API_URL;

    const requestedNumberOfQuestions = numberOfQuestions ? numberOfQuestions : DEFAULT_NUMBER_OF_QUESTIONS;

    const url = `${baseUrl}?amount=${requestedNumberOfQuestions}&category=15&type=boolean&encode=base64`;

    try {
        const response = await fetch(url)
        const body = await response.json();

        body.results && body.results?.length > 0 && body.results.map(({question, correct_answer, incorrect_answers }, index) => {
            StoredQuestions.push({
                id: index,
                question,
                correct_answer,
                user_answer: ""
            });
        });

        WriteFile(StoredQuestions);

        reply.send({
            response_code: body.response_code,
            results: StoredQuestions
        });

    } catch (error){
        return error;
    }
}

export async function GetQuestionHandler(request: FastifyRequest, reply: FastifyReply) {

    const { id: paramId } = request.params;

    const data = ReadFile('db.txt');

    const { question } = data.find(({id}) => {
        return Number(id) === Number(paramId);
    });

    if(!question) {
        return reply.send(
            {
                response_code: 400,
                message: `Question ${paramId} does not exist. Please try again.`,
            }
        )
    }
        reply.send({
            response_code: 200,
            result: question
        });
}

export async function PostQuestionsHandler(request: FastifyRequest, reply: FastifyReply) {

    const { question } = request.body;

    const data = ReadFile('db.txt');

    const storedQuestion = data.find(({id}) => Number(id) === Number(question.id));

    if(!storedQuestion) {
        reply.send({
            response_code: 400,
            message: `Question ${question} was not found. Please try again.`,
        })
    }

    storedQuestion.user_answer = question.user_answer;

    reply.send({
        response_code: 200,
        result: question,
        message: `Successfully stored answer to question`
    });

}