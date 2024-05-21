export class AnswerEntity{

    constructor(
        public readonly date: Date,
        public readonly question: {[Key: string]: any},
        public readonly user: {[key: string]: any},
        public readonly answer: string,
        public readonly id: string,
    ){};

}