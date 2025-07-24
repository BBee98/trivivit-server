import { z } from "zod/v4";
import {QuestionModel} from "./question.model";



export const Question = z.object({
    type:              z.string(),
    difficulty:        z.string(),
    category:          z.string(),
    question:          z.string(),
    correct_answer:    z.string(),
    incorrect_answers: z.array(z.string())
})

export const QuestionSchema = {
    response_code: z.number(),
    results: z.array(Question)
}

export const StoredQuestions: Array<QuestionModel> = [];

export const StoredAnswers = []