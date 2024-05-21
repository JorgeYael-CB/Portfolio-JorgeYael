import { MailerService } from "../../../config";
import { AddQuestionDto } from "../../dtos/question";
import { CustomError } from "../../errors";
import { QuestionRepository } from "../../repositories";



export class AddQuestionUsecase{

    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly mailerService: MailerService,
        private readonly mailerUser: string | string[],
    ){};


    add = async(addQuestionDto: AddQuestionDto, idUser: string) => {
        const question = await this.questionRepository.addQuestion(addQuestionDto, idUser);
        if( !question ){
            throw CustomError.internalServerError('Oops! An unexpected error has occurred, please try again later.', {
                error: 'question o el usuario no existe (undefined)',
                file: __dirname,
            });
        };

        const {user, user: {name, email}} = question;

        await this.mailerService.send({
            to: this.mailerUser,
            subject: `El usuario: ${name} a hecho una pregunta`,
            html: `
                <h1>Detalles de la pregunta</h1>
                <p>User: <strong>${name}</strong> </p>
                <p>Email: <strong>${email}</strong> </p>
                <p>-----------------------------------------</p>
                <p>Título de la pregunta: <strong>${question.questionTitle}</strong></p>
                <p>Pregunta: <strong>${question.question}</strong></p>
            `
        });

        return{
            succes: true,
            succesMessage: 'The question has been added successfully.',
            error: false,
            user,
            question: {
                date: question.date,
                title: question.questionTitle,
                question: question.question,
            },
        };
    };
};