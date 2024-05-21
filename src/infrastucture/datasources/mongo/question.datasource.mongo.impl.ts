import { QuestionModel } from "../../../db/mongo";
import { QuestionDatasource } from "../../../domain/datasources";
import { AddQuestionDto } from "../../../domain/dtos/question";
import { QuestionEntity } from "../../../domain/entities/question.entity";
import { CustomError } from "../../../domain/errors";
import { QuestionMapper } from "../../mappers";


export class QuestionDatasourceMongoImpl implements QuestionDatasource {

    constructor(){}


    async getQuestionById(id: string): Promise<QuestionEntity> {
        const question = await QuestionModel.findById(id).populate('user');
        if( !question ) throw CustomError.unauthorized('The question is not valid at this time.');

        const questionMapper = QuestionMapper.getQuestionFromObject(question);

        return questionMapper;
    };


    async getQuestions(): Promise<QuestionEntity[]> {
        const questions = await QuestionModel.find().populate('user',{
            _id: 0,
            name: 1,
            verify: 1,
            banned: 1,
        });

        return questions.map( question => QuestionMapper.getQuestionFromObject(question));
    };


    async addQuestion(addQuestionDto: AddQuestionDto, userId: string): Promise<QuestionEntity> {
        const totalQuestions = await QuestionModel.find({user: userId}).exec();
        if( totalQuestions.length >= 3 ) throw CustomError.unauthorized('You have exceeded the limit of questions, if you have a question you can contact support.');

        const newQuestion = await QuestionModel.create({
            questionTitle: addQuestionDto.title,
            question: addQuestionDto.question,
            date: Date.now(),
            user: userId,
        });

        const [, populateQuestion] = await Promise.all([
            newQuestion.save(),
            newQuestion.populate('user', {
                name: 1,
                _id: 1,
                verify: 1,
                email: 1,
                banned: 1,
            })
        ])

        return QuestionMapper.getQuestionFromObject(populateQuestion);
    };
};