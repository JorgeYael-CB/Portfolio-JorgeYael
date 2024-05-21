import { MailerService } from "../../../config";
import { AddAnswerDto } from "../../dtos/answer";
import { CustomError } from "../../errors";
import { AnswerRepository } from '../../repositories/answer.repository';




export class AddAnswerUsecase{

    constructor(
        private readonly answerRepository: AnswerRepository,
        private readonly mailerService: MailerService,
    ){};


    add = async(addAnswerDto: AddAnswerDto) => {
        const answerDb = await this.answerRepository.addAnwser(addAnswerDto);
        if( !answerDb ) throw CustomError.internalServerError('The answer could not be added successfully, please try again later.', {
            error: 'La respuesta viene vacia',
            file: __dirname,
        });

        const {question, user: {name, email, verify, banned, roles}, answer} = answerDb;

        //* Enviamos un email al usuario de que alguien le respondio
        this.mailerService.send({
            to: question.user.email,
            subject: 'Someone Answered Your Question on DevCompleteStudios',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                    <header style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">DevCompleteStudios</h1>
                    </header>
                    <main style="padding: 20px;">
                        <h2 style="color: #007bff;">Hi, ${question.user.name}</h2>
                        <p>We wanted to let you know that your question on <strong>DevCompleteStudios</strong> has received a new answer!</p>

                        <section style="margin-top: 20px;">
                            <h3 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Question Details</h3>
                            <p><strong>Title:</strong> ${question.questionTitle}</p>
                            <p><strong>Question:</strong> ${question.question}</p>
                        </section>

                        <section style="margin-top: 20px;">
                            <h3 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Answer Details</h3>
                            <p><strong>Answered by:</strong> ${name}</p>
                            <div style="background-color: #f9f9f9; border-left: 4px solid #007bff; padding: 10px; margin-top: 10px;">
                                <p style="margin: 0;">${answer}</p>
                            </div>
                        </section>

                        <p style="margin-top: 20px;">You can view your question and the answer by logging into your account on <strong>DevCompleteStudios</strong>.</p>

                        <p>If you have any further questions or need assistance, feel free to <a href="mailto:support@devcompletestudios.com" style="color: #007bff;">contact our support team</a>.</p>
                    </main>
                    <footer style="background-color: #f1f1f1; color: #666; text-align: center; padding: 10px;">
                        <p style="margin: 0;">Best regards,<br>The DevCompleteStudios Team</p>
                    </footer>
                </div>
            `
        });
    };
};