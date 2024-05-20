import { Checks } from "../../../config";

export class RequestPasswordDto{

    constructor(
        public readonly email: string,
    ){};


    static create( obj: {[key:string]: any} ):[string?, RequestPasswordDto?]{
        const {email} = obj;

        const [emailError, emailMapper] = Checks.email(email);
        if( emailError ) return [emailError];


        return[undefined, new RequestPasswordDto(emailMapper!)];
    };
};