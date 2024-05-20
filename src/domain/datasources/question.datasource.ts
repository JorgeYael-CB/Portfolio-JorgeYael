import { AddQuestionDto } from "../dtos/question";
import { UserEntity } from "../entities";
import { QuestionEntity } from "../entities/question.entity";


export abstract class QuestionDatasource {
    abstract addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<{user: UserEntity, question: QuestionEntity}>;
}