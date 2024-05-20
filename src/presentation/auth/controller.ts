import { Request, Response } from "express";
import { AuthLoginUserDto, AuthRegisterUserDto } from "../../domain/dtos/auth";
import { AuthUserRepository } from "../../domain/repositories";
import { JwtAdapter, MailerService } from "../../config";
import { CustomError } from "../../domain/errors";
import { LoginUserUsecase, RegisterUserUsecase } from "../../domain/use-cases/auth";



export class AuthController{

    //* DI
    constructor(
        private readonly authRepository: AuthUserRepository,
        private readonly jwtAdatper: JwtAdapter,
        private readonly mailerService: MailerService,
    ){};


    private readonly handleError = (err:any, res:Response) => {
        if( err instanceof CustomError ){
            return res.status(err.level).json({error: true, errorMessage: err.message, succes: false, message: undefined});
        }

        //* Manejamos los errores no personalizados en una bse de datos o algo así
        console.log(err);

        return res.status(500).json({error: true, errorMessage: 'An unexpected error has occurred! Please try again later.', succes:false, message: undefined});
    };


    registerUser = (req:Request, res:Response) => {
        const [error, authRegisterUserDto] = AuthRegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({error: true, errorMessage: error, succes: false, succesMessage: undefined});

        const {urlValiateEmail} = req.query;
        if( !urlValiateEmail ) return res.status(400).json({error: true, errorMessage: 'Missing urlValiateEmail in params', succes: false, succesMessge: undefined});

        const useCase = new RegisterUserUsecase(this.authRepository, this.jwtAdatper, this.mailerService);
        useCase.register(authRegisterUserDto!, urlValiateEmail)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };


    loginUser = (req:Request, res:Response) => {
        const [error, authLoginUserDto] = AuthLoginUserDto.create(req.body);
        if( error ){
            return res.status(400).json({error: true, errorMessage: error, succes: false, succesMessage: undefined})
        };

        const useCase = new LoginUserUsecase(this.authRepository, this.jwtAdatper);
        useCase.login(authLoginUserDto!)
            .then( data => res.json(data) )
            .catch( err => this.handleError(err, res) );
    }
};