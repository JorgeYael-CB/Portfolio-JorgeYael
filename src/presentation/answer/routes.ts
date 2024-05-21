import { Router } from "express";
import { AnswerController } from "./controller";
import { Bcrypt, JwtAdapter, MailerService, envs } from "../../config";
import { AuthMiddleware } from "../middlewares";
import { AuthRepositoryImpl } from '../../infrastucture/repositories/auth.repository.impl';
import { AuthDatasourceMongoImpl } from "../../infrastucture/datasources";
import { AnswerRepositoryImpl } from "../../infrastucture/repositories/answer.repository.impl";
import { AnswerDatasourceMongoImpl } from "../../infrastucture/datasources/mongo/answer.datasource.mongo";



const mailerService = new MailerService({
    pass: envs.MAILER_PASS,
    user: envs.MAILER_USER,
});

const jwtAdapter = new JwtAdapter(envs.JWT_KEY);
const bcrypt = new Bcrypt();

const authDatsource = new AuthDatasourceMongoImpl(bcrypt)
const authUserRepository = new AuthRepositoryImpl(authDatsource);

const answerDatasource = new AnswerDatasourceMongoImpl(authUserRepository);
const answerRepository = new AnswerRepositoryImpl(answerDatasource);



export class AnswerRoutes{
    static get routes():Router{
        const routes = Router();
        const authMiddleware = new AuthMiddleware(jwtAdapter, authUserRepository);
        const controller = new AnswerController(mailerService, answerRepository);


        routes.post('/add-answer', authMiddleware.validateJwt, controller.addAnswer);


        return routes;
    }
};