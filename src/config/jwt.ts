import jwt from 'jsonwebtoken';

export class JwtAdapter {
    constructor(
        private readonly jwtKey: string,
    ) {};

    create(payload: { [key: string]: any }, duration: string = '5m'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, this.jwtKey, { expiresIn: duration }, function (error, encoded) {
                if (error) {
                    resolve(null);
                    return;
                };

                resolve(encoded!); // Cambiado return por resolve
            });
        });
    };

    validate<T>(token: string): Promise<T | null> {
        return new Promise(resolve => {
            jwt.verify(token, this.jwtKey, (error, decoded) => {
                if (error) return resolve(null);

                resolve(decoded as T); // Cambiado return por resolve
            });
        });
    };
};
