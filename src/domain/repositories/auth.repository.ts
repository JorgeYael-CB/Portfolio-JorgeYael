import { AuthLoginUserDto, AuthRegisterUserDto } from '../dtos/auth';
import { UserEntity } from '../entities';



export abstract class AuthUserRepository {
    abstract registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<UserEntity>;
    abstract loginUser(authLoginUserDto: AuthLoginUserDto): Promise<UserEntity>;
    abstract resetPassword(newPassword: string, userId: string): Promise<UserEntity>;
    abstract deleteAccount(userId: string): boolean;
    abstract getUserById(userId: string): Promise<UserEntity>;
};