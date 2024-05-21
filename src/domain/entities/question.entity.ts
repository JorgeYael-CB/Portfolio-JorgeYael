export class QuestionEntity {
    constructor(
        public readonly question: string,
        public readonly questionTitle: string,
        public readonly id: string,
        public readonly user: {[Key:string]: any},
        public readonly date: Date,
    ) {}
};