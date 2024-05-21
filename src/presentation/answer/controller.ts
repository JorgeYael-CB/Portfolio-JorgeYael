import { Request, Response } from "express";
import { MailerService } from "../../config";




export class AnswerController {

    constructor(
        private readonly mailerService: MailerService,
    ){};


    addAnser = (req:Request, res:Response) => {

    };


    getAnswerByIdQuestion = (req:Request, res:Response) => {

    };

};