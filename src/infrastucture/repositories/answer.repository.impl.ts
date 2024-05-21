import { AnswerDatasource } from "../../domain/datasources/answer.datasource";
import { AddAnswerDto } from "../../domain/dtos/answer";
import { AnswerEntity } from "../../domain/entities";
import { AnswerRepository } from "../../domain/repositories/answer.repository";



export class AnswerRepositoryImpl implements AnswerRepository {


    constructor(
        private readonly answerDatasource: AnswerDatasource,
    ){};


    addAnser(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
        return this.answerDatasource.addAnser(addAnswerDto);
    }
    getAnsewerByIdQuestion(questionId: string): Promise<{ answer: AnswerEntity; }> {
        return this.answerDatasource.getAnsewerByIdQuestion(questionId);
    }

}