import { AnswerDatasource } from "../../../domain/datasources/answer.datasource";
import { AddAnswerDto } from "../../../domain/dtos/answer";
import { UserEntity, QuestionEntity, AnswerEntity } from "../../../domain/entities";



export class AnswerDatasourceMongoImpl implements AnswerDatasource {


    constructor(){};


    addAnser(addAnswerDto: AddAnswerDto): Promise<{ userAnswer: UserEntity; userQuestion: UserEntity; question: QuestionEntity; answer: AnswerEntity; }> {
        throw new Error("Method not implemented.");
    }

    getAnsewerByIdQuestion(questionId: string): Promise<{ answer: AnswerEntity; }> {
        throw new Error("Method not implemented.");
    }

};