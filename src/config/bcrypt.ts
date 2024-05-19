import {compareSync, hashSync} from 'bcrypt';


export class Bcrypt{

    constructor(){};

    compare = (password: string, cryptPassword: string) => {
        return compareSync(password, cryptPassword);
    };

    hash = (password:string) => {
        return hashSync(password, 12);
    };

}