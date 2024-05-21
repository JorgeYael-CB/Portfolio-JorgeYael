import { CustomError } from "../../errors";
import { QuestionRepository } from "../../repositories";



export class GetQuestionUsecase{

    constructor(
        private readonly questionRepository: QuestionRepository,
    ){};


    get = async(l: any | undefined, p: any | undefined) => {
        const questions = await this.questionRepository.getQuestions() ?? [];

        const limit = l ? +l : +questions.length;
        const page =  p ? +p : 1;

        if( isNaN(limit) ) throw CustomError.badRequest('query param l is not a number');
        if( +p <= 0 ) throw CustomError.badRequest('query param p debe ser mayor a 0');
        if( +l <= 0 ) throw CustomError.badRequest('query param l debe ser mayor a 0');
        if( isNaN(page) ) throw CustomError.badRequest('query param p is not a number');

        const questionsPage = questions.slice((page - 1) * limit);

        if( questionsPage.length <= 0) throw CustomError.badRequest(`El arreglo de preguntas solo tiene: ${questions.length}`);
        const questionsArray = questionsPage.slice(0, limit);


        return {
            error: false,
            errorMessage: undefined,
            succes: true,
            succesMessage: 'All questions loaded correctly',
            data: {
                questions: questionsArray,
                limit,
                page: page,
                allPages: Math.round(questions.length / l),
                numQuestions: +questions.length,
            }
        };
    };
};