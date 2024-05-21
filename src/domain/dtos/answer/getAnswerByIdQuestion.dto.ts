export class getAnswerByIdQuestion{

    constructor(
        public readonly questionId: string,
    ){};


    static create = (obj: {[Key: string]:any}):[string?, getAnswerByIdQuestion?] => {
        const { questionId } = obj;


        if( !questionId ) return ['Missing questionId'];


        return[undefined, new getAnswerByIdQuestion(questionId)];
    };

};