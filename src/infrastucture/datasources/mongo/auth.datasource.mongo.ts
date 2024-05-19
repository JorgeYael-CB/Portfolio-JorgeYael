import { AuthUserDatasource } from "../../../domain/datasources";
import { AuthRegisterUserDto, AuthLoginUserDto } from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities";


export class AuthDatasourceMongoImpl implements AuthUserDatasource{

    constructor(){};


    registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    loginUser(authLoginUserDto: AuthLoginUserDto): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }

    deleteAccount(userId: string): boolean {
        throw new Error("Method not implemented.");
    }
};