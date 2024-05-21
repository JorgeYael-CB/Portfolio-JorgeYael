import { Router } from "express";
import { AnswerController } from "./controller";
import { MailerService, envs } from "../../config";



const mailerService = new MailerService({
    pass: envs.MAILER_PASS,
    user: envs.MAILER_USER,
});




export class AnswerRoutes{
    static get routes():Router{
        const routes = Router();
        const controller = new AnswerController(mailerService);


        routes.post('/add-answer',);


        return routes;
    }
};