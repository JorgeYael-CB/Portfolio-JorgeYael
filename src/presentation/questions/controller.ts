import { Request, Response } from "express";
import { MailerService } from "../../config";
import { QuestionRepository } from "../../domain/repositories";
import { AddQuestionDto } from "../../domain/dtos/question";
import { AddQuestionUsecase, GetQuestionUsecase } from "../../domain/use-cases/question";
import { CustomError } from "../../domain/errors";



export class QuestionController{

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly mailerService: MailerService,
        private readonly mailerNotifyQuestion: string | string[],
    ){};


    private readonly handleError = (err:any, res:Response) => {
        if( err instanceof CustomError ){
            return res.status(err.level).json({error: true, errorMessage: err.message, succes: false, message: undefined});
        }

        //* Manejamos los errores no personalizados en una bse de datos o algo así
        console.log(err);

        return res.status(500).json({error: true, errorMessage: 'An unexpected error has occurred! Please try again later.', succes:false, message: undefined});
    };


    addQuestion = (req:Request, res:Response) => {
        const [error, addQuestionDto] = AddQuestionDto.create(req.body);
        if( error ) return res.status(400).json({error: true, errorMessage: error, succes: false, succesMessage: undefined});

        const { userId } = req.body;

        const useCase = new AddQuestionUsecase(this.questionRepository, this.mailerService, this.mailerNotifyQuestion);
        useCase.add(addQuestionDto!, userId)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res));
    };


    getQuestions = (req:Request, res:Response) => {
        const { l, p, r } = req.query;

        const useCase = new GetQuestionUsecase(this.questionRepository);
        useCase.get(l, p, r)
            .then( data => res.status(200).json(data) )
            .catch( err => this.handleError(err, res) );
    };
};