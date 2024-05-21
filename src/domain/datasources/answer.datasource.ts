import { AddAnswerDto } from "../dtos/answer";
import { QuestionEntity, UserEntity, AnswerEntity } from "../entities";



export abstract class AnswerDatasource{
    abstract addAnser(addAnswerDto: AddAnswerDto): Promise<{userAnswer: UserEntity, userQuestion: UserEntity, question:QuestionEntity, answer: AnswerEntity}>;
    abstract getAnsewerByIdQuestion( questionId: string ):Promise<{answer: AnswerEntity}>;
};