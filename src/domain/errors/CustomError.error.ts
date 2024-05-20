export class CustomError extends Error{


    constructor(
        public readonly level: number,
        public readonly error: string,
        public readonly details?: any,
    ){
        super(error);
    };


    static internalServerError = (error: string, details?: any) => {
        //* Manejamos los errores internos en una BaseDeDatos o en un bot de discord
        console.log(error);

        return new CustomError(500, 'Internal Server Error', details);
    };

    static badRequest = (error:string, details?: any) => {
        return new CustomError(400, error, details);
    };

    static unauthorized  = (error: string, details?: any) => {
        return new CustomError(401, error, details);
    }


};