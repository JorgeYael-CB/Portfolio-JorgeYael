import { Request, Response } from "express";
import { ContactByEmailDto } from "../../domain/dtos/contact";
import { ByEmailUsecase } from "../../domain/use-cases/contact";
import { MailerService } from "../../config";
import { CustomError } from "../../domain/errors";


export class ContactController{

    constructor(
        private readonly mailerService: MailerService,
    ){};


    private readonly handleError = (err:any, res:Response) => {
        if( err instanceof CustomError ){
            return res.status(err.level).json({error: true, errorMessage: err.message, succes: false, message: undefined});
        }

        //* Manejamos los errores no personalizados en una bse de datos o algo así
        return res.status(500).json({error: true, errorMessage: 'An unexpected error has occurred! Please try again later.', succes:false, message: undefined});
    };


    byEmail = (req:Request, res:Response) => {
        const [error, contactByEmailDto] = ContactByEmailDto.create(req.body);
        if( error ) return res.status(400).json({error: true, errorMessage: error, succes: false, message: undefined});


        const useCase = new ByEmailUsecase(this.mailerService);

        useCase.email(contactByEmailDto!)
            .then( () => res.status(200).json({succes: true, message: 'Email already send!', error: false, erroMessage: undefined}) )
            .catch( err => this.handleError(err, res) );
    };
};