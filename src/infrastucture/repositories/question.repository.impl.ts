import { QuestionDatasource } from "../../domain/datasources";
import { AddQuestionDto } from "../../domain/dtos/question";
import { UserEntity } from "../../domain/entities";
import { QuestionEntity } from "../../domain/entities/question.entity";
import { QuestionRepository } from "../../domain/repositories";


export class QuestionRepositoryImpl implements QuestionRepository {

    constructor(
        private readonly questionDatasource: QuestionDatasource,
    ){}


    getQuestionById(id: string): Promise<QuestionEntity> {
        return this.questionDatasource.getQuestionById(id);
    };

    getQuestions(): Promise<QuestionEntity[]> {
        return this.questionDatasource.getQuestions();
    };

    addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<QuestionEntity> {
        return this.questionDatasource.addQuestion(addQuestionDto, userId);
    }


}