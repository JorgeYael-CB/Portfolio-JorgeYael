export class AddAnswerDto{

    constructor(
        public readonly questionId: string,
        public readonly answer: string,
    ){};


    static create = (obj: {[Key: string]:any}):[string?, AddAnswerDto?] => {
        const { questionId, answer } = obj;


        if( !questionId ) return ['Missing questionId'];
        if( !answer ) return ['Missing answer'];

        if( answer.trim().length <= 5 ) return ['answer is too short'];
        if( answer.trim().length >= 400 ) return ['answer is too long'];


        return[undefined, new AddAnswerDto(questionId, answer.trim())];
    };

};