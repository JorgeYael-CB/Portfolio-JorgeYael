import { Bcrypt } from "../../../config";
import { UserModel } from "../../../db/mongo";
import { AuthUserDatasource } from "../../../domain/datasources";
import { AuthRegisterUserDto, AuthLoginUserDto } from "../../../domain/dtos/auth";
import { UserEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { AuthUserMapper } from "../../mappers";


export class AuthDatasourceMongoImpl implements AuthUserDatasource{

    constructor(
        private readonly bcrypt: Bcrypt,
    ){};


    async getUserById(userId: string): Promise<UserEntity> {
        const user = await UserModel.findById(userId);
        if( !user ) throw CustomError.unauthorized(`User not found`);

        if( user.banned ) throw CustomError.unauthorized('User banned.');

        return AuthUserMapper.getUserFromObject(user);
    };


    async registerUser(authRegisterUserDto: AuthRegisterUserDto): Promise<UserEntity> {
        const user = await UserModel.findOne({email: authRegisterUserDto.email});
        if( user && user.verify ) throw CustomError.unauthorized('User already exist');

        if( !user ){
            const passwordHash = this.bcrypt.hash(authRegisterUserDto.password);

            const newUser = await UserModel.create({
                email: authRegisterUserDto.email,
                name: authRegisterUserDto.name,
                password: passwordHash,
            });

            return AuthUserMapper.getUserFromObject(newUser);
        } else {
            return AuthUserMapper.getUserFromObject(user);
        }
    };


    async loginUser(authLoginUserDto: AuthLoginUserDto): Promise<UserEntity> {
        const user = await UserModel.findOne({email: authLoginUserDto.email});
        if( !user ) throw CustomError.badRequest('User not exist');

        const comparePassword = this.bcrypt.compare(authLoginUserDto.password, user.password!);
        if( !comparePassword ) throw CustomError.unauthorized('The credentials do not match.');

        return AuthUserMapper.getUserFromObject(user);
    };


    async resetPassword(newPassword: string, userId: string): Promise<UserEntity> {
        const user = await UserModel.findById(userId);
        if( !user ) throw CustomError.badRequest('User not exist');

        user.password = this.bcrypt.hash(newPassword);
        await user.save();

        return AuthUserMapper.getUserFromObject(user);
    };


    async deleteAccount(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    };
};