import {fastify} from "../../../core/app";
import {HttpGetQuestionsUrl, HttpGetQuestionUrl, HttpPostQuestion} from "./routes";

fastify.register((app, _, done) => {
    app.register((app , _, done) => {
        HttpGetQuestionsUrl(app);
        done();
    }, { prefix: '/questions' });

    app.register((app , _, done) => {
        HttpGetQuestionUrl(app);
        done();
    }, { prefix: '/question' });

    app.register((app , _, done) => {
        HttpPostQuestion(app);
        done();
    }, { prefix: '/question' });

    done();
}, { prefix: '/v1' })

