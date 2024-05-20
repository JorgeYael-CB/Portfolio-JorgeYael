import { QuestionDatasource } from "../../domain/datasources";
import { AddQuestionDto } from "../../domain/dtos/question";
import { UserEntity } from "../../domain/entities";
import { QuestionEntity } from "../../domain/entities/question.entity";
import { QuestionRepository } from "../../domain/repositories";


export class QuestionRepositoryImpl implements QuestionRepository {

    constructor(
        private readonly questionDatasource: QuestionDatasource,
    ){}


    getQuestions(): Promise<QuestionEntity[]> {
        return this.questionDatasource.getQuestions();
    };

    addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<{ user: UserEntity; question: QuestionEntity; }> {
        return this.questionDatasource.addQuestion(addQuestionDto, userId);
    }


}