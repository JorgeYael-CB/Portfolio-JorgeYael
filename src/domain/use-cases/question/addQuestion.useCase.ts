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


    add = async(addQuestionDto: AddQuestionDto, userId: string) => {
        const { question, user } = await this.questionRepository.addQuestion(addQuestionDto, userId);
        if( !question || !user ){
            throw CustomError.internalServerError('Oops! An unexpected error has occurred, please try again later.', {
                error: 'question o el usuario no existe (undefined)',
                file: __dirname,
            });
        };

        await this.mailerService.send({
            to: this.mailerUser,
            subject: `El usuario: ${user.name} a hecho una pregunta`,
            html: `
                <h1>Detalles de la pregunta</h1>
                <p>User: <strong>${user.name}</strong> </p>
                <p>Email: <strong>${user.email}</strong> </p>
                <p>-----------------------------------------</p>
                <p>Título de la pregunta: <strong>${question.questionTitle}</strong></p>
                <p>Pregunta: <strong>${question.question}</strong></p>
            `
        });

        return{
            succes: true,
            succesMessage: 'The question has been added successfully.',
            error: false,
            user: {
                name: user.name,
                id: user.id,
                roles: user.roles,
                email: user.email,
            },
            question: {
                date: question.date,
                title: question.questionTitle,
                question: question.question,
            },
        };
    };
};