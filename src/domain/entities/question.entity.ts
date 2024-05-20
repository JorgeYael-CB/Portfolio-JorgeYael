export class QuestionEntity {
    constructor(
        public readonly question: string,
        public readonly questionTitle: string,
        public readonly id: string,
        public readonly userId: string,
        public readonly date: Date,
    ) {}
};