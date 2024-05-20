import { CustomError } from "../../errors";
import { AuthUserRepository } from "../../repositories";

export class VerifyAccountUsecase{

    constructor(
        private readonly authUserRepository: AuthUserRepository,
    ){};

    verify = async(userId: string) => {
        const user = await this.authUserRepository.verifyAccount(userId);
        if( !user ){
            throw CustomError.internalServerError('Oops! An unexpected error has occurred, please try again later.', {error: 'Usuario es undefined', file: __dirname});
        };

        return {
            error: false,
            errorMessage: undefined,
            succes: true,
            succesMessage: 'The account has been successfully verified.',
            user: {
                name: user.name,
                id: user.id,
                roles: user.roles,
                date: user.date,
            }
        };
    };
};