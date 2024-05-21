import { Request, Response } from "express";
import { MailerService } from "../../config";
import { AddAnswerDto } from "../../domain/dtos/answer";
import { AddAnswerUsecase } from "../../domain/use-cases/answer";
import { AnswerRepository } from "../../domain/repositories/answer.repository";
import { CustomError } from "../../domain/errors";




export class AnswerController {

    constructor(
        private readonly mailerService: MailerService,
        private readonly answerRepo: AnswerRepository,
    ){};


    private readonly handleError = (err:any, res:Response) => {
        if( err instanceof CustomError ){
            return res.status(err.level).json({error: true, errorMessage: err.message, succes: false, message: undefined});
        }

        //* Manejamos los errores no personalizados en una bse de datos o algo así
        console.log(err);

        return res.status(500).json({error: true, errorMessage: 'An unexpected error has occurred! Please try again later.', succes:false, message: undefined});
    };

    addAnswer = (req:Request, res:Response) => {
        const [error, addAnswerDto] = AddAnswerDto.create(req.body);
        if( error ) return res.status(400).json({error: true, errorMessage: error, succes: false});

        const useCase = new AddAnswerUsecase(this.answerRepo, this.mailerService);
        useCase.add(addAnswerDto!)
            .then( () => res.json('succes') )
            .catch( err => this.handleError(err, res));
    };


    getAnswerByIdQuestion = (req:Request, res:Response) => {

    };

};