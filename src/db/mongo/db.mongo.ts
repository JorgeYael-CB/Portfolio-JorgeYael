import mongoose from 'mongoose';
import { CustomError } from '../../domain/errors';


export class MongoDb{

    constructor(
        private readonly mongoUri: string
    ){}


    public connect(){
        try {
            mongoose.connect(this.mongoUri);
            console.log('DB Mongo Connected!');
        } catch (error) {
            throw CustomError.internalServerError(`${error}`, {message: 'Error en la clase de MongoDb en el metodo connect', file: `${__dirname}`});
        }
    };

};