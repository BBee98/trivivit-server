import {FastifyReply} from "fastify";

export async function GetQuestionsHandler(reply: FastifyReply) {

    const baseUrl = process.env.TRIVIA_API_URL;

    const url = `${baseUrl}?amount=10&category=15&type=boolean&encode=base64`;

    try {
        const response = await fetch(url)
        const body = await response.json();
        reply.send(body);

    } catch (error){
        return error;
    }
}