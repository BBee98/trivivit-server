import {fastify} from "../../../core/app";
import {HttpGetBaseUrl} from "./routes";

fastify.register((app, _, done) => {
    app.register((app , _, done) => {
        HttpGetBaseUrl(app);
        done();
    }, { prefix: '/questions' })
    done();
}, { prefix: '/v1' })

