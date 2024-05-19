import { Router } from "express";
import { ContactRoutes } from "./contact/routes";

export class Routes{
    static get routes():Router{
        const routes = Router();


        //* Todas las rutas principales
        routes.use('/api/contact', ContactRoutes.routes);


        return routes;
    }
}