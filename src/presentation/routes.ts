import { Router } from "express";
import { ContactRoutes } from "./contact/routes";
import { AuthRoutes } from "./auth/routes";


export class Routes{
    static get routes():Router{
        const routes = Router();


        //* Todas las rutas principales
        routes.use('/api/contact', ContactRoutes.routes);
        routes.use('/api/auth', AuthRoutes.routes);


        return routes;
    }
}