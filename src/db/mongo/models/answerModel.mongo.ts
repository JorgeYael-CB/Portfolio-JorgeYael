import mongoose, { Schema } from 'mongoose';



const AnswerSchema = new Schema({
    date: {
        type: Date,
        default: Date.now(),
    },

    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: [true, 'Question is required'],
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },

    answer: {
        type: String,
        required: [true, 'Answer is required'],
    },
});

export const AnswerModel = mongoose.model('Answer', AnswerSchema);