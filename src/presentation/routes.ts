import { Router } from "express";
import { ContactRoutes } from "./contact/routes";
import { AuthRoutes } from "./auth/routes";
import { QuestionRoutes } from "./questions/routes";


export class Routes{
    static get routes():Router{
        const routes = Router();


        //* Todas las rutas principales
        routes.use('/api/contact', ContactRoutes.routes);
        routes.use('/api/auth', AuthRoutes.routes);
        routes.use('/api/questions', QuestionRoutes.routes);


        return routes;
    }
}