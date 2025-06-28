export interface QuestionsResponse {
    response_code: number;
    results:       Array<QuestionInterface>;
}

export interface QuestionInterface {
    type:              Base64URLString;
    difficulty:        Base64URLString;
    category:          Base64URLString;
    question:          Base64URLString;
    correct_answer:    Base64URLString;
    incorrect_answers: Array<Base64URLString>;
}

