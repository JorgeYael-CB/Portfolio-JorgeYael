export class AnswerEntity{

    constructor(
        public readonly date: Date,
        public readonly question: string,
        public readonly user: string,
        public readonly answer: string,
    ){};

}