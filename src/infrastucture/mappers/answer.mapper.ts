import { AnswerEntity } from "../../domain/entities";



export class AnswerMapper{

    static getAnswerByObject( obj: {[Key:string]: any} ):AnswerEntity{
        const {_id, id, date, question, user, answer } = obj;


        return new AnswerEntity(date, question, user, answer, id || _id);
    }

}