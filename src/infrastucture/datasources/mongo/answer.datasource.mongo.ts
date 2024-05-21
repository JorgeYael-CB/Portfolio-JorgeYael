import { AnswerModel } from "../../../db/mongo";
import { AnswerDatasource } from "../../../domain/datasources/answer.datasource";
import { AddAnswerDto } from "../../../domain/dtos/answer";
import { AnswerEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { AuthUserRepository } from "../../../domain/repositories";
import { AnswerMapper } from "../../mappers";



export class AnswerDatasourceMongoImpl implements AnswerDatasource {

    constructor(
        private readonly authUserRepository: AuthUserRepository,
    ){};


    async addAnwser(addAnswerDto: AddAnswerDto): Promise<AnswerEntity> {
        const {answer, questionId, userId} = addAnswerDto;

        const user = await this.authUserRepository.getUserById(userId);
        if( !user || user.banned || !user.verify || !user.roles.includes('DEVELOPER') ){
            throw CustomError.unauthorized('you do not have access to answer questions.');
        };

        const newAnswer = await AnswerModel.create({
            answer: answer,
            date: Date.now(),
            question: questionId,
            user: userId,
        });

        const [, populateAnswer] = await Promise.all([
            newAnswer.save(),
            (await (await newAnswer.populate('user')).populate({
                path: 'question',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })),
        ]);

        return AnswerMapper.getAnswerByObject(populateAnswer);
    };

    getAnsewerByIdQuestion(questionId: string): Promise<{ answer: AnswerEntity; }> {
        throw new Error("Method not implemented.");
    }

};