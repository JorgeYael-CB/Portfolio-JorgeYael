import { QuestionEntity } from "../../domain/entities";




export class QuestionMapper{
    static getQuestionFromObject(questionModel: {[key:string]: any}):QuestionEntity{
        const { date, user, question, questionTitle, id, _id} = questionModel;

        return new QuestionEntity(question, questionTitle, id || _id, user, date);
    }
};