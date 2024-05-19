export class UserEntity{

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly roles: string[],
        public readonly verify: boolean,
        public readonly date: Date,
        public readonly banned: boolean,
        public readonly id: string,
    ){};

}