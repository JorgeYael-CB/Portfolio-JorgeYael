import { Request, Response } from "express";
import { AuthRegisterUserDto } from "../../domain/dtos/auth";

export class AuthController{

    //* DI
    constructor(){};


    registerUser = (req:Request, res:Response) => {
        const [error, authRegisterUserDto] = AuthRegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({error: true, errorMessage: error, succes: false, succesMessage: undefined});

        res.status(200).json(authRegisterUserDto);
    };

};