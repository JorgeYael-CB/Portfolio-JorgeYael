import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes{
    static get routes():Router{
        const routes = Router();
        const controller = new AuthController();


        //* Manejamos las rutas
        routes.post('/register-user', controller.registerUser);


        return routes;
    }
}