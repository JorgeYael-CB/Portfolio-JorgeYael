export class AddQuestionDto{

    constructor(
        public readonly question: string,
        public readonly title: string,
    ){};

    static create(obj: {[key: string]: any}):[string?, AddQuestionDto?]{
        const {question, title} = obj;

        if( !question ) return ['Missing question'];
        if( Number(question) ) return ['question is not valid!'];
        if( question.trim().length < 5 ) return ['question is too short'];
        if( question.trim().length > 300 ) return ['question is too long'];

        if( !title ) return ['Missing title'];
        if( Number(title) ) return ['title is not valid!'];
        if( title.trim().length < 4 ) return ['title is too short'];
        if( title.trim().length > 80 ) return ['title is too long'];


        return[undefined, new AddQuestionDto(question.trim(), title.trim())];
    }
};