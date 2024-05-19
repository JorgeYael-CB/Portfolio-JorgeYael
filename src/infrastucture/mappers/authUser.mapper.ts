import { UserEntity } from "../../domain/entities";



export class AuthUserMapper{
    static getUserFromObject(user: {[key:string]: any}):UserEntity{
        const {name, email, password, roles, verify, date, banned, id, _id} = user;


        return new UserEntity(name, email, password, roles, verify, date, banned, id || _id)
    }
}