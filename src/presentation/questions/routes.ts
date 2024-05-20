import { Router } from "express";
import { QuestionController } from "./controller";
import { QuestionRepositoryImpl } from "../../infrastucture/repositories/";
import { AuthDatasourceMongoImpl, QuestionDatasourceMongoImpl } from "../../infrastucture/datasources/mongo";
import { AuthRepositoryImpl } from '../../infrastucture/repositories/auth.repository.impl';
import { Bcrypt, JwtAdapter, MailerService, envs } from "../../config";
import { AuthMiddleware } from "../middlewares";



const bcrypt = new Bcrypt();
const jwtAdaper = new JwtAdapter(envs.JWT_KEY);

const authDatasource = new AuthDatasourceMongoImpl(bcrypt)
const authUserRepository = new AuthRepositoryImpl(authDatasource);

const questionDatasource = new QuestionDatasourceMongoImpl(authUserRepository);
const questionRepository = new QuestionRepositoryImpl(questionDatasource);

const mailerService = new MailerService({
    pass: envs.MAILER_PASS,
    user: envs.MAILER_USER,
});


export class QuestionRoutes{

    static get routes():Router{
        const routes = Router();
        const authMiddleware = new AuthMiddleware(jwtAdaper);
        const controller = new QuestionController(questionRepository, mailerService, envs.MAILER_USER);


        //* Manejamios las rutas
        routes.post('/add-question', authMiddleware.validateJwt, controller.addQuestion);
        routes.get('/get-questions', controller.getQuestions);



        return routes;
    };
};