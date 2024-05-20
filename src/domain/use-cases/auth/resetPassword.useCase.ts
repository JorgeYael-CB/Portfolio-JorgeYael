import { JwtAdapter, MailerService } from "../../../config";
import { ResetPasswordDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthUserRepository } from "../../repositories";



export class ResetPasswordUsecase{

    constructor(
        private readonly authUserRepository: AuthUserRepository,
        private readonly mailerService: MailerService,
        private readonly jwtAdapter: JwtAdapter,
    ){};

    async reset(resetPaswordDto: ResetPasswordDto, userId: string){
        const user = await this.authUserRepository.resetPassword(resetPaswordDto.password, userId);

        if( !user ){
            console.log('ax2')
            throw CustomError.internalServerError('Oops! There seems to have been an error, please try again later.')
        };

        //* Enviamos un email de confirmación
        await this.mailerService.send({
            to: user.email,
            subject: 'password reset confirmation',
            html: `
                <h1>Hi, ${user.name}</h1>
                <p>Your password has been successfully reset in DevComplete Studios.</p>
                <p>If it wasn't you, you can send a message to support.</p>
            `,
        });

        return {
            succes: true,
            succesMessage: 'password changed successfully!',
            error: false,
            errorMessage: undefined,
            user: {
                name: user.name,
                id: user.id,
            }
        }
    }

}