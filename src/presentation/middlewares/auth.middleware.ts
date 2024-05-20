import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { CustomError } from "../../domain/errors";


export class AuthMiddleware {

    constructor(
        private readonly jwtAdapter: JwtAdapter,
    ){};


    validateJwt = async(req:Request, res:Response, next: NextFunction) => {
        const authorization = req.header('Authorization');
        if( !authorization ) return res.status(401).json({
            error: true,
            errorMessage: 'no token provided',
            succes: false,
            succesMessage: undefined,
        });

        if( !authorization.startsWith('Bearer ') ){
            return res.status(401).json({error: true, errorMessage: 'invalid Bearer Token'});
        };

        const token = authorization.split(' ').at(1) || '';

        try {
            const payload = await this.jwtAdapter.validate<{userId: string, iat:number, exp:number}>(token);

            if( !payload ){
                return res.status(401).json({
                    error: true,
                    errorMessage: 'This session is not valid or has expired',
                    succes: false,
                    succesMessage: undefined,
                });
            };

            req.body.userId = payload.userId;

            next();
        } catch (error) {
            //* Manejamos los errores
            CustomError.internalServerError(`${error}`, {
                error: 'Error en el Middleware de validacion del token',
                file:__dirname
            });

            res.status(500).json({
                error: true,
                errorMessage: 'Oops! There has been an unexpected error, please try again later.',
                succes: false,
                succesMessage: undefined,
            })
        };
    };
};