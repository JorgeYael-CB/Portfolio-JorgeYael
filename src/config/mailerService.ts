import nodemailer, { Transporter } from 'nodemailer';
import { CustomError } from '../domain/errors';


interface Props{
    host?: string;
    user: string;
    pass: string;
};

interface EmailProps{
    to: string | string[];
    subject: string;
    html: string;
};


export class MailerService{

    private transport: Transporter;


    constructor(config: Props){
        const {host = 'smtp.gmail.com', user, pass} = config;

        this.transport = nodemailer.createTransport({
            host,
            auth: {
                user,
                pass,
            }
        });
    };


    async send(emailConfig: EmailProps){
        const {html, subject, to} = emailConfig;

        try {
            const info = await this.transport.sendMail({
                to,
                subject,
                html,
            });

            return true;
        } catch (error) {
            CustomError.internalServerError(`${error}`, 'Error en MailerService, el error esta relacionado en el metodo send');
            return false;
        }
    };

};