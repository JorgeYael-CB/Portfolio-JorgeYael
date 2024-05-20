import { Checks } from "../../../config";



export class ResetPasswordDto{

    constructor(
        public readonly password: string,
    ){};

    static create(obj: {[key:string]:any}): [string?, ResetPasswordDto?]{
        const {password} = obj;

        const [passError, passMapper] = Checks.password(password);
        if( passError ) return [passError];


        return [undefined, new ResetPasswordDto(passMapper!)];
    };

};