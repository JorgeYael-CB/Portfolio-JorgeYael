export class AddAnswerDto{

    constructor(
        public readonly questionId: string,
        public readonly answer: string,
        public readonly userId: string,
    ){};


    static create = (obj: {[Key: string]:any}):[string?, AddAnswerDto?] => {
        const { questionId, answer, userId } = obj;


        if( !questionId ) return ['Missing questionId'];
        if( !answer ) return ['Missing answer'];

        if( answer.trim().length <= 5 ) return ['answer is too short'];
        if( answer.trim().length >= 400 ) return ['answer is too long'];

        if( !userId ) return ['There is an error, please try again later.'];


        return[undefined, new AddAnswerDto(questionId, answer.trim(), userId)];
    };
};