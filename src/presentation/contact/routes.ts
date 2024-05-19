import { Router } from "express";
import { ContactController } from "./controller";
import { MailerService, envs } from "../../config";



const mailerService = new MailerService({
    pass: envs.MAILER_PASS,
    user: envs.MAILER_USER,
});



export class ContactRoutes{

    static get routes():Router{
        const routes = Router();
        const controller = new ContactController(mailerService);


        routes.post('/by-email', controller.byEmail);


        return routes;
    };
};