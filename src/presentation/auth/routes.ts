import { Router } from "express";
import { AuthController } from "./controller";
import { AuthRepositoryImpl } from '../../infrastucture/repositories/auth.repository.impl';
import { AuthDatasourceMongoImpl } from '../../infrastucture/datasources/mongo/auth.datasource.mongo';
import { Bcrypt, JwtAdapter, MailerService, envs } from "../../config";


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
        const controller = new AuthController(authRepository, jwtAdapter, mailerService);


        //* Manejamos las rutas
        routes.post('/register-user', controller.registerUser);


        return routes;
    }
}