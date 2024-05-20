import { JwtAdapter, MailerService } from "../../../config";
import { AuthLoginUserDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthUserRepository } from "../../repositories";



export class LoginUserUsecase{

    constructor(
        private readonly authUserRepository: AuthUserRepository,
        private readonly jwtAdapter: JwtAdapter,
    ){};


    public login = async(authLoginUserDto: AuthLoginUserDto) => {
        const user = await this.authUserRepository.loginUser(authLoginUserDto);
        if( !user ){
            throw CustomError.internalServerError('User not exist in Login', {error: 'El usuario es undefined en el Login', file: __dirname});
        }

        const jwt = this.jwtAdapter.create({userId: user.id}, '1h');

        return {
            error: false,
            errorMessage: undefined,
            succes: true,
            user: {
                email: user.email,
                name: user.name,
                id: user.id,
                roles: user.roles,
                verify: user.verify,
                date: user.date,
            },
            jwt,
        }
    };
};