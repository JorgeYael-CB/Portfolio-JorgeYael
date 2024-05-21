import { AddAnswerDto } from "../dtos/answer";
import { AnswerEntity } from "../entities";



export abstract class AnswerRepository{
    abstract addAnwser(addAnswerDto: AddAnswerDto): Promise<AnswerEntity>;
    abstract getAnsewerByIdQuestion( questionId: string ):Promise<{answer: AnswerEntity}>;
};