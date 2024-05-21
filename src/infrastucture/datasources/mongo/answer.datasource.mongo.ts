import { AnswerDatasource } from "../../../domain/datasources/answer.datasource";
import { AddAnswerDto } from "../../../domain/dtos/answer";
import { AnswerEntity } from "../../../domain/entities";



export class AnswerDatasourceMongoImpl implements AnswerDatasource {

    constructor(){};


    addAnser(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
        throw new Error("Method not implemented.");
    }

    getAnsewerByIdQuestion(questionId: string): Promise<{ answer: AnswerEntity; }> {
        throw new Error("Method not implemented.");
    }

};