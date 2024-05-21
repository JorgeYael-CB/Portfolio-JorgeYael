import { AddAnswerDto } from "../dtos/answer";
import { AnswerEntity } from "../entities";



export abstract class AnswerDatasource{
    abstract addAnser(addAnswerDto: AddAnswerDto): Promise<AnswerEntity>;
    abstract getAnsewerByIdQuestion( questionId: string ):Promise<{answer: AnswerEntity}>;
};