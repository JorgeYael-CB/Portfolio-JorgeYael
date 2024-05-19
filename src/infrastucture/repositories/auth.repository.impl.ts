import { AuthUserDatasource } from "../../domain/datasources";
import { AuthRegisterUserDto, AuthLoginUserDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { AuthUserRepository } from "../../domain/repositories";


export class AuthRepositoryImpl implements AuthUserRepository{

    constructor(
        private readonly authDatasource: AuthUserDatasource,
    ){};


    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.registerUser(authRegisterUserDto);
    }

    loginUser(authLoginUserDto: AuthLoginUserDto): Promise<UserEntity> {
        return this.authDatasource.loginUser(authLoginUserDto);
    }

    resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        return this.authDatasource.resetPassword(newPassword, userId);
    }

    deleteAccount(userId: string): boolean {
        return this.deleteAccount(userId);
    }
};