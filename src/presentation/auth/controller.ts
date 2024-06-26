import { Request, Response } from "express";
import { AuthLoginUserDto, AuthRegisterUserDto, RequestPasswordDto, ResetPasswordDto } from "../../domain/dtos/auth";
import { AuthUserRepository } from "../../domain/repositories";
import { JwtAdapter, MailerService } from "../../config";
import { CustomError } from "../../domain/errors";
import { LoginUserUsecase, RegisterUserUsecase, RequestPasswordUsecase, VerifyAccountUsecase } from "../../domain/use-cases/auth";
import { ResetPasswordUsecase } from "../../domain/use-cases/auth/resetPassword.useCase";



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
    };


    requestPassword = (req:Request, res:Response) => {
        const [error, requestPasswordDto] = RequestPasswordDto.create(req.body);
        if( error ){
            return res.status(400).json({error: true, errorMessage: error, succes: false, succesMessage: undefined});
        };

        const {urlResetPass} = req.query;
        if( !urlResetPass ) {
            return res.status(400).json({error: true, errorMessage: 'Missing urlResetPass in params', succes: false, succesMessage: undefined})
        };

        const useCase = new RequestPasswordUsecase(this.authRepository, this.mailerService, this.jwtAdatper);
        useCase.requestPass(requestPasswordDto!, urlResetPass)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };


    resetPasword = (req:Request, res:Response) => {
        const [error, resetPasswordDto] = ResetPasswordDto.create(req.body);
        if( error ) return res.status(400).json({error: true, erroMessage: error, succes: false, succesMessage: undefined});
        const { userId } = req.body;

        const useCase = new ResetPasswordUsecase(this.authRepository, this.mailerService, this.jwtAdatper);
        useCase.reset(resetPasswordDto!, userId)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };


    verifyAccount = (req:Request, res:Response) => {
        const {userId} = req.body;

        const useCase = new VerifyAccountUsecase(this.authRepository);
        useCase.verify(userId)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };
};