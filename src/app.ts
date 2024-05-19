import { envs } from "./config";
import { MongoDb } from "./db/mongo";
import { CustomError } from "./domain/errors";
import { Routes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
    main()
})();


async function main() {

    try {
        new MongoDb(envs.MONGO_DB_URI)
            .connect();
    } catch (error) {
        throw CustomError.internalServerError(`${error}`);
    };


    const routes = Routes.routes;
    const server = new Server({
        port: envs.PORT,
        routes,
    });

    server.start();
};