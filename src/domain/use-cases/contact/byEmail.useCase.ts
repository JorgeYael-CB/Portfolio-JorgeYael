import { MailerService, envs } from "../../../config";
import { ContactByEmailDto } from "../../dtos/contact";
import { CustomError } from "../../errors";

export class ByEmailUsecase{

    constructor(
        private readonly mailerService: MailerService,
    ){};


    email = async(contactByEmailDto: ContactByEmailDto) => {
        const {email, message, name, phoneNumber = undefined} = contactByEmailDto;

        const userEmail = this.mailerService.send({
            to: email,
            subject: 'Thank you for contacting me',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h1 style="color: #4CAF50;">Thank You for Contacting Me!</h1>
                    <p>Hello, ${name}.</p>
                    <p>Thank you for reaching out. I have received your message and will get back to you as soon as possible.</p>
                    <p>Your inquiry is very important to me, and I aim to respond within 24-48 hours.</p>
                    <p>In the meantime, feel free to browse through my website for more information or follow me on my social media channels.</p>
                    <p>Best regards,</p>
                    <p><strong>Jorge Yael</strong></p>
                    <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
                    <p style="font-size: 12px; color: #777;">
                        If you did not send this email, please ignore this message.
                    </p>
                </div>
            `
        });
        const myEmail = this.mailerService.send({
            to: envs.MAILER_USER,
            subject: 'Alguien te quiere contactar.',
            html: `
                <h1>Un usuario se quiere poner en contacto contigo</h1>
                <p>Aquí estan los detalles del usuario.</p>

                <p>Nombre: <strong>${name}</strong> </p>
                <p>mensaje: <strong>${message}</strong> </p>
                <p>correo: <strong>${email}</strong> </p>
                <p>numero de celular: <strong>${ phoneNumber? phoneNumber: 'No ingreso un número de celular.'}</strong></p>
            `
        });

        const [emailOne, emailSecond] = await Promise.all([userEmail, myEmail]);

        if( !emailOne || !emailSecond ) {
            throw CustomError.badRequest('Oops! It seems there has been an error sending emails, please try again later.')
        }
    };
};