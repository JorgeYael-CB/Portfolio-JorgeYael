import { JwtAdapter, MailerService } from "../../../config";
import { AuthRegisterUserDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthUserRepository } from "../../repositories";



export class RegisterUserUsecase{

    constructor(
        private readonly authRepository: AuthUserRepository,
        private readonly jwtAdatper: JwtAdapter,
        private readonly mailerService: MailerService,
    ){};


    register = async(authRegisterUserDto: AuthRegisterUserDto, urlValidateEmail: any) => {
        const user = await this.authRepository.registerUser(authRegisterUserDto);

        if( !user ){
            throw CustomError.internalServerError(
                'Oops! An unexpected error occurred while registering the user, please try again later.',
                {
                    error: 'Ha ocurrido un error en registerUserUsecase al registrar el usuario viene vácio',
                    file: __dirname,
                }
            );
        };

        //* Le creamos un JWT con su ID
        const token = await this.jwtAdatper.create({userId: user.id});
        if( !token ) {
            throw CustomError.internalServerError('Error generando el token.', {file: __dirname, error: 'No viene, solo no crea el token'});
        };

        //* enviar un email para decirle que tiene que confirmar la cuenta
        await this.mailerService.send({
            to: user.email,
            subject: 'Verify your account in DevComplete Studios',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="text-align: center; color: #333;">Welcome to DevComplete Studios, ${user.name}!</h2>
                    <p>Verify your account at the following link:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${urlValidateEmail}/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Your Account</a>
                    </div>
                    <p>If you did not create an account with DevComplete Studios, please ignore this email.</p>
                    <p>This link is valid for <strong>5 minutes</strong>. If you need to receive this email again to confirm your account, please register again.</p>
                    <p>The DevComplete Studios Team</p>
                </div>
            `
        });

        //* Mandamos la data
        return {
            error: false,
            errorMessage: undefined,
            succes: true,
            succesMessage: 'An email was sent to register the account.',
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
                roles: user.roles,
                verify: user.verify,
                date: user.date,
            }
        };
    };
};