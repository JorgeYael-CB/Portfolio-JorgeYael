import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from '../../infrastucture/repositories/auth.repository.impl';
import { AuthDatasourceMongoImpl } from '../../infrastucture/datasources/mongo/auth.datasource.mongo.impl';
import { Bcrypt, JwtAdapter, MailerService, envs } from "../../config";
import { AuthMiddleware } from "../middlewares";


const bcrypt = new Bcrypt()

const authDatasourceMongo = new AuthDatasourceMongoImpl(bcrypt)
const authRepository = new AuthRepositoryImpl(authDatasourceMongo);

const jwtAdapter = new JwtAdapter(envs.JWT_KEY);
const mailerService = new MailerService({
    pass: envs.MAILER_PASS,
    user: envs.MAILER_USER,
})


export class AuthRoutes{
    static get routes():Router{
        const routes = Router();

        const authMiddleware = new AuthMiddleware(jwtAdapter, authRepository);
        const controller = new AuthController(authRepository, jwtAdapter, mailerService);


        //* Manejamos las rutas
        routes.post('/register-user', controller.registerUser);
        routes.post('/login-user', controller.loginUser);
        routes.post('/request-password', controller.requestPassword);
        routes.patch('/reset-password', [authMiddleware.validateJwt], controller.resetPasword);
        routes.patch('/verify-account', [authMiddleware.validateJwt], controller.verifyAccount);


        return routes;
    }
}