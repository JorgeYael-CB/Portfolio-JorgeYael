import { AddQuestionDto } from "../dtos/question";
import { UserEntity } from "../entities";
import { QuestionEntity } from "../entities/question.entity";


export abstract class QuestionDatasource {
    abstract addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<QuestionEntity>;
    abstract getQuestions():Promise<QuestionEntity[]>;
    abstract getQuestionById(id: string):Promise<QuestionEntity>;
};