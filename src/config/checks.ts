export class Checks {
    static email(email: string): [string?, string?] {
        if (!email) return ['Missing email'];

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return ['Email is not valid'];

        return [undefined, email.trim()];
    };

    static numberPhone(number: string): [string?, number?] {
        if (isNaN(Number(number))) return ['You must enter a valid number.'];
        if (number.length !== 10) return ['Phone number is not valid'];

        return [undefined, Number(number)];
    };

    static password( password: string ):[string?, string?]{
        if( !password ) return ['Missing password'];

        if( Number(password) ) return ['The password cannot have only numbers.'];
        if( password.length <= 6 ) return ['password is too short'];
        if( password.length >= 80 ) return ['password is too long'];
        if( password.includes(' ') ) return ['password cannot have spaces'];


        return [undefined, password.trim()];
    }
}