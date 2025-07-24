import {readFileSync, writeFileSync} from 'fs';
import {QuestionModel} from "../features/question/domain/question.model";

export function WriteFile(data: Array<QuestionModel>){
    writeFileSync('db.txt', JSON.stringify(data))
}

export function ReadFile(fileName: string){
    const data = readFileSync(fileName);
    return JSON.parse(data.toString());
}
