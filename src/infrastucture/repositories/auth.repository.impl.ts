import { AuthUserDatasource } from "../../domain/datasources";
import { AuthRegisterUserDto, AuthLoginUserDto, RequestPasswordDto } from "../../domain/dtos/auth";
import { UserEntity } from "../../domain/entities";
import { AuthUserRepository } from "../../domain/repositories";


export class AuthRepositoryImpl implements AuthUserRepository{

    constructor(
        private readonly authDatasource: AuthUserDatasource,
    ){}


    verifyAccount(userId: string): Promise<UserEntity> {
        return this.authDatasource.verifyAccount(userId);
    };

    requestPassword(requestPasswordDto: RequestPasswordDto): Promise<UserEntity> {
        return this.authDatasource.requestPassword(requestPasswordDto);
    };

    getUserById(userId: string): Promise<UserEntity> {
        return this.authDatasource.getUserById(userId);
    };

    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<UserEntity> {
        return this.authDatasource.registerUser(authRegisterUserDto);
    }

    loginUser(authLoginUserDto: AuthLoginUserDto): Promise<UserEntity> {
        return this.authDatasource.loginUser(authLoginUserDto);
    }

    resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        return this.authDatasource.resetPassword(newPassword, userId);
    }

    deleteAccount(userId: string):Promise<boolean> {
        return this.deleteAccount(userId);
    }
};