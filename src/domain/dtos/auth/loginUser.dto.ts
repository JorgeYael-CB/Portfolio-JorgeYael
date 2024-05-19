import { Checks } from "../../../config";

export class AuthLoginUserDto{
    constructor(
        public readonly email: string,
        public readonly password: string,
    ){};

    static create = (obj: {[key:string]: any}):[string?, AuthLoginUserDto?] => {
        const {email, password} = obj;

        const [emailError, emailMapper] = Checks.email(email);
        const [passwordError, passwordMapper] = Checks.password(password);

        if( emailError || passwordError ){
            return [emailError ?? passwordError]
        };


        return [undefined, new AuthLoginUserDto(emailMapper!, passwordMapper!)];
    };
}