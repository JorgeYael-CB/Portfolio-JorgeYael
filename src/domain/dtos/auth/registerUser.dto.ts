import { Checks } from "../../../config";

export class AuthRegisterUserDto{


    constructor(
        public readonly name:string,
        public readonly email:string,
        public readonly password:string,
    ){};


    static create = (obj: {[key: string]: any}):[string?, AuthRegisterUserDto?] => {
        const {name, email, password, repeatPassword = undefined} = obj;

        if( !name ) return ['Missing name'];
        if( Number(name) ) return ['name is not valid'];
        if( name.trim().length <= 3 ) return ['name is too short'];
        if( name.trim().length >= 60 ) return ['name is too long'];

        const [emailError, emailMapper] = Checks.email(email);
        const [passwordError, passwordMapper] = Checks.password(password);

        if( emailError || passwordError ){
            return [emailError ?? passwordError];
        };

        if( repeatPassword && repeatPassword.trim() !== passwordMapper ){
            return ['Passwords do not match'];
        };

        return[undefined, new AuthRegisterUserDto(name.trim(), emailMapper!, passwordMapper!)];
    };

}