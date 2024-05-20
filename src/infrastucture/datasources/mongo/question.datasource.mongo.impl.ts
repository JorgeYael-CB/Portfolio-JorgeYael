import { QuestionModel } from "../../../db/mongo";
import { QuestionDatasource } from "../../../domain/datasources";
import { AddQuestionDto } from "../../../domain/dtos/question";
import { UserEntity } from "../../../domain/entities";
import { QuestionEntity } from "../../../domain/entities/question.entity";
import { CustomError } from "../../../domain/errors";
import { AuthUserRepository } from "../../../domain/repositories";
import { AuthUserMapper, QuestionMapper } from "../../mappers";


export class QuestionDatasourceMongoImpl implements QuestionDatasource {

    constructor(
        private readonly authUserRepository: AuthUserRepository,
    ){};


    async addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<{ user: UserEntity; question: QuestionEntity; }> {
        const user = await this.authUserRepository.getUserById(userId);
        if( !user ) throw CustomError.unauthorized('User not exist');

        const totalQuestions = await QuestionModel.find({user: userId}).exec();
        if( totalQuestions.length >= 3 ) throw CustomError.unauthorized('You have exceeded the limit of questions, if you have a question you can contact support.');

        const newQuestion = await QuestionModel.create({
            questionTitle: addQuestionDto.title,
            question: addQuestionDto.question,
            date: Date.now(),
            user: userId,
        });

        await newQuestion.save();
        return {question: QuestionMapper.getQuestionFromObject(newQuestion), user: AuthUserMapper.getUserFromObject(user)};
    };

};