import { Checks } from "../../../config";


export class ContactByEmailDto{

    constructor(
        public readonly email: string,
        public readonly message: string,
        public readonly name: string,
        public readonly phoneNumber?: string,
    ){};


    static create = ( obj: { [key:string]:any } ):[string?, ContactByEmailDto?] => {
        const {email, message, phoneNumber = undefined, name} = obj;
        let numberError = undefined, numberMapper= undefined;

        const [emailError, emailMapper] = Checks.email(email);

        phoneNumber
        ?
            [numberError, numberMapper] = phoneNumber && Checks.numberPhone( phoneNumber.toString())
        :
            undefined;

        if( emailError || numberError ) {
            return[emailError ?? numberError];
        };

        if( !message ) return ['Missing message'];
        if( message.trim().length <= 5 ) return ['message is too short'];

        if( !name ) return ['Missing name'];
        if( message.trim().length <= 3 ) return ['name is too short'];


        return[undefined, new ContactByEmailDto(emailMapper!, message.trim(), name.trim(), numberMapper)];
    };
};