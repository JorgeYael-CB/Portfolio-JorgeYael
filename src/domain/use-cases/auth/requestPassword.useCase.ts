import { JwtAdapter, MailerService } from "../../../config";
import { RequestPasswordDto } from "../../dtos/auth";
import { AuthUserRepository } from "../../repositories";



export class RequestPasswordUsecase{

    constructor(
        private readonly authUserRepository: AuthUserRepository,
        private readonly mailerService: MailerService,
        private readonly jwtAdapter: JwtAdapter,
    ){};


    requestPass = async(requestPasswordDto: RequestPasswordDto, urlResetPass: any) => {
        const user = await this.authUserRepository.requestPassword(requestPasswordDto);
        const token = await this.jwtAdapter.create({userId: user.id}, '5m');

        await this.mailerService.send({
            to: user.email,
            subject: 'Reset your account in DevComplete_Studios',
            html: `
                <h1>We received your request to restore your access to DevComplete_Studios</h1>
                <p>you can recover it at the following <a href=${urlResetPass}/${token}>Link</a></p>
            `
        });

        return {
            error: false,
            errorMessage: undefined,
            succes: true,
            succesMessage: 'An email was sent to reset your password',
            user: {
                name: user.name,
                id: user.id,
                email: user.email,
                roles: user.roles,
            }
        }
    };

;}