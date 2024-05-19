export class Checks {
    static email(email: string): [string?, string?] {
        if (!email) return ['Missing email'];

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) return ['Email is not valid'];

        return [undefined, email.trim()];
    }

    static numberPhone(number: string): [string?, number?] {
        if (isNaN(Number(number))) return ['You must enter a valid number.'];
        if (number.length !== 10) return ['Phone number is not valid'];

        return [undefined, Number(number)];
    }
}